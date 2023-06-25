import { _decorator, EventKeyboard, EventMouse, Graphics, input, Input, instantiate, KeyCode, Layout, Node, Prefab, Size, Sprite, SpriteFrame, UITransform, Vec2, Vec3, Widget } from 'cc';
import { UIComp } from '../../framework/ui/UIComp';
import { CONST } from '../base/CONST';
import { MapMgr } from '../base/MapMgr';
import { ResMgr } from '../../framework/mgr/ResMgr';
import { BaseUT } from '../../framework/base/BaseUtil';
import { MessageTip } from '../common/message/MessageTip';
import { ColorGrid } from './grid/ColorGrid';
const { ccclass, property } = _decorator;

/*
 * @Descripttion: 编辑器地图滚动组件
 * @Author: CYK
 * @Date: 2023-05-30 23:00:00
 */
@ccclass('MapScrollComp')
export class MapScrollComp extends UIComp {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/mapEditor/MapScrollComp';
    @property({ type: Node, tooltip: "地图总容器" })
    public grp_mapLayer: Node;
    @property({ type: Node, tooltip: "地图滚动容器" })
    public grp_scrollMap: Node;
    @property({ type: Node, tooltip: "地图切片容器" })
    public grp_mapSlices: Node;
    @property({ type: Node, tooltip: "地图格子路点容器" })
    public grp_colorGrid: Node;
    @property({ type: Graphics })
    public graphicsGrid: Graphics;
    @property({ type: Prefab })
    public colorGrid: Prefab;

    public scaleCb: Function;
    public scaleCbCtx: any;
    /**编辑区域宽高 */
    private _editAreaSize: Size;
    private _pressSpace: boolean;
    /**是否按下鼠标左键 */
    private _pressMouseLeft: boolean;
    /**是否按下鼠标右键 */
    private _pressMouseRight: boolean;
    private _isInEditArea: boolean;
    private _preUIPos: Vec2;
    private mapMgr: MapMgr;
    private _scrollMapUITranstorm: UITransform;
    /** 当前绘制的格子类型*/
    private _gridType: CONST.GridType;
    protected onEnter(): void {
        let self = this;
        self.mapMgr = MapMgr.inst;
        self._scrollMapUITranstorm = self.grp_scrollMap.getComponent(UITransform);
        self._gridType = CONST.GridType.GridType_none;
        self.onEmitter(CONST.GEVT.ChangeGridType, self.onChangeGridType);
    }

    public async onImportMapJson() {
        let self = this;
        await self.addMapSlices();
    }

    /**导入地图切片 */
    private async addMapSlices() {
        let self = this;
        self.grp_mapSlices.destroyAllChildren();
        self.grp_colorGrid.destroyAllChildren();
        self.grp_scrollMap.setPosition(0, 0, 0);
        self.grp_scrollMap.setScale(new Vec3(1, 1, 1));
        let mapMgr = self.mapMgr;
        var mapFloorArr = mapMgr.mapFloorArr;
        var mapslice = mapMgr.mapslice;
        var tempX: number = 0;
        var tempY: number = 0;
        var index: number = 0;
        var totWidth: number = 0;
        var totHeight: number = 0;
        var hasFinishOneLine: boolean;
        let mapSliceLayout = self.grp_mapSlices.getComponent(Layout);
        mapSliceLayout.constraintNum = mapslice;
        for (let i = 0; i < mapFloorArr.length; i++) {
            await showFloorItor(mapFloorArr[i]);
        }
        mapMgr.mapWidth = totWidth;
        mapMgr.mapHeight = totHeight;
        BaseUT.setSize(self.grp_scrollMap, totWidth, totHeight);
        BaseUT.setSize(self.grp_mapSlices, totWidth, totHeight);
        console.log("地图宽高:", mapMgr.mapWidth, mapMgr.mapHeight);
        self.init();
        async function showFloorItor(floorInfo: any) {
            let url: string = floorInfo.nativePath;
            return new Promise<void>((resolve, reject) => {
                ResMgr.inst.loadLocalImg(url, (spriteFrame: SpriteFrame) => {
                    index++;
                    console.log(floorInfo.sourceName, spriteFrame.texture.width, spriteFrame.texture.height);
                    tempX = (tempX + spriteFrame.texture.width);
                    if (!hasFinishOneLine) totWidth += spriteFrame.texture.width;
                    if (index == mapslice) {
                        index = 0;
                        tempX = 0;
                        tempY = (tempY + spriteFrame.texture.height);
                        totHeight += spriteFrame.texture.height;
                        hasFinishOneLine = true;
                    };
                    let mapSliceNode = BaseUT.newUINode(floorInfo.sourceName);
                    let sprite = mapSliceNode.addComponent(Sprite);
                    sprite.spriteFrame = spriteFrame;
                    mapSliceNode.setParent(self.grp_mapSlices);
                    resolve();
                }, self);
            })
        }
    }

    private init() {
        let self = this;
        self.initGrid();
        self.initEvent();
    }

    /**初始化网格线条 */
    private initGrid() {
        let self = this;
        let cellSize = self.mapMgr.cellSize;
        let numCols = Math.floor(self.mapMgr.mapWidth / cellSize);
        let numRows = Math.floor(self.mapMgr.mapHeight / cellSize);

        let lineGraphics = self.graphicsGrid;
        lineGraphics.clear();
        lineGraphics.lineWidth = 1;
        for (let i = 0; i < numCols + 1; i++)//画竖线
        {
            lineGraphics.moveTo(i * cellSize, 0);
            lineGraphics.lineTo(i * cellSize, numRows * cellSize);
        }

        for (let i = 0; i < numRows + 1; i++)//画横线
        {
            lineGraphics.moveTo(0, i * cellSize);
            lineGraphics.lineTo(numCols * cellSize, i * cellSize);
        }
        lineGraphics.stroke();
    }

    /**初始化事件 */
    private initEvent() {
        let self = this;
        self._editAreaSize = BaseUT.getSize(self.grp_mapLayer);
        // this.node.on(Node.EventType.MOUSE_MOVE, this.onShowRoadMsg, self),
        self.grp_mapLayer.on(Node.EventType.MOUSE_DOWN, self.onMouseDown, self);
        self.grp_mapLayer.on(Node.EventType.MOUSE_UP, self.onMouseUp, self);
        self.grp_mapLayer.on(Node.EventType.MOUSE_LEAVE, self.onMouseLeave, self);
        self.grp_mapLayer.on(Node.EventType.MOUSE_WHEEL, self.onMouseWheel, self);
        self.grp_mapLayer.on(Node.EventType.MOUSE_ENTER, self.onMouseEnter, self);

        input.on(Input.EventType.KEY_DOWN, self.onKeyDown, self); //监听键盘按键按下
        input.on(Input.EventType.KEY_UP, self.onKeyUp, self); //监听键盘按键放开
    }

    private onMouseDown(e: EventMouse) {
        let self = this;
        self._preUIPos = e.getUILocation();
        self.grp_mapLayer.on(Node.EventType.MOUSE_MOVE, self.onMouseMove, self);

        if (!self._pressSpace && self._gridType != CONST.GridType.GridType_none) {
            let buttonId = e.getButton();
            if (buttonId == EventMouse.BUTTON_LEFT) {
                self._pressMouseLeft = true;
            } else if (buttonId == EventMouse.BUTTON_RIGHT) {
                self._pressMouseRight = true;
            }
            if (self._pressMouseRight) {
                self.removeGrid(self._gridType, e.getLocation());
            } else if (self._pressMouseLeft) {
                self.addGrid(self._gridType, e.getLocation());
            }
        }

        // console.log('getLocation: '+JSON.stringify(e.getLocation()));
        // let mousePos = BaseUT.getMousePos(e.getLocation());
        // console.log('mousePos: '+JSON.stringify(mousePos));
    }

    private onMouseMove(e: EventMouse) {
        let self = this;
        if (self._pressSpace) {//拖动地图
            let curUILocation = e.getUILocation();
            let deltaX = curUILocation.x - self._preUIPos.x;
            let deltaY = curUILocation.y - self._preUIPos.y;
            let toX = self.grp_scrollMap.position.x + deltaX;
            let toY = self.grp_scrollMap.position.y + deltaY;
            self.grp_scrollMap.setPosition(toX, toY);
            self._preUIPos = curUILocation;
            self.checkLimitPos();
        } else {
            if (self._gridType != CONST.GridType.GridType_none) {
                if (self._pressMouseRight) {
                    self.removeGrid(self._gridType, e.getLocation());
                } else if (self._pressMouseLeft) {
                    self.addGrid(self._gridType, e.getLocation());
                }
            }
        }
    }

    private onMouseUp(e: EventMouse) {
        let self = this;
        this.grp_mapLayer.hasEventListener(Node.EventType.MOUSE_MOVE) && this.grp_mapLayer.off(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);

        let buttonId = e.getButton();
        if (buttonId == EventMouse.BUTTON_LEFT) {
            self._pressMouseLeft = false;
        } else if (buttonId == EventMouse.BUTTON_RIGHT) {
            self._pressMouseRight = false;
        }
    }

    /**填充格子 */
    private addGrid(gridType: CONST.GridType, location: Vec2) {
        let self = this;
        if (!self.mapMgr.gridTypeMap[gridType]) {
            self.mapMgr.gridTypeMap[gridType] = {};
        }
        let cellSize = self.mapMgr.cellSize;
        let mousePos = BaseUT.getMousePos(location);//这里不直接取evt.getLocation()，再封装一层是因为舞台缩放，会影响evt.getLocation()的坐标） 
        let localUIPos = self._scrollMapUITranstorm.convertToNodeSpaceAR(new Vec3(mousePos.x, mousePos.y, 0));
        let drawXY = self.mapMgr.pos2Grid(localUIPos.x, localUIPos.y);
        let key = drawXY.x + "_" + drawXY.y;
        if (self.mapMgr.gridTypeMap[gridType][key]) return;//已有格子
        let colorGrid = instantiate(self.colorGrid);
        let colorGridScript = colorGrid.getComponent(ColorGrid);
        colorGrid.setParent(self.grp_colorGrid);
        colorGridScript.drawRect(self.mapMgr.getColorByType(gridType), self.mapMgr.cellSize, drawXY.x * cellSize, drawXY.y * cellSize);
        self.mapMgr.gridTypeMap[gridType][key] = colorGrid;
    }

    /** 清除格子*/
    private removeGrid(gridType: CONST.GridType, location: Vec2) {
        let self = this;
        if (!self.mapMgr.gridTypeMap[gridType]) return;
        let mousePos = BaseUT.getMousePos(location);//这里不直接取evt.getLocation()，再封装一层是因为舞台缩放，会影响evt.getLocation()的坐标） 
        let localUIPos = self._scrollMapUITranstorm.convertToNodeSpaceAR(new Vec3(mousePos.x, mousePos.y, 0));
        let drawXY = self.mapMgr.pos2Grid(localUIPos.x, localUIPos.y);
        let key = drawXY.x + "_" + drawXY.y;
        let colorGrid: Node = self.mapMgr.gridTypeMap[gridType][key];
        if (!colorGrid) return;
        delete self.mapMgr.gridTypeMap[gridType][key];
        colorGrid.destroy();
    }

    private onChangeGridType(dt: any) {
        let self = this;
        self._gridType = dt.gridType;
    }

    private onMouseEnter(e: EventMouse) {
        let self = this;
        self._isInEditArea = true;
        self.checkMousCursor();
    }

    private onMouseLeave(e: EventMouse) {
        let self = this;
        self._isInEditArea = false;
        self.checkMousCursor();
    }

    private onMouseWheel(event: EventMouse) {
        let location = event.getLocation();
        event.getScrollY() > 0 ? this.scaleMap(0.1, location) : this.scaleMap(-0.1, location);
    }

    /**重置缩放比例 */
    public resetScale() {
        let self = this;
        let oldScale = self.grp_scrollMap.scale.x;
        if (oldScale == 1) return;//已经是初始缩放比例
        let widget = self.node.getComponent(Widget);
        let selfSize = BaseUT.getSize(self.node);
        let location = new Vec2(widget.left + selfSize.width / 2, widget.bottom + selfSize.height / 2);//以当前地图视角中心为圆心来重置缩放
        self.scaleMap(1 - self.grp_scrollMap.scale.x, location);
    }

    /**
     * 缩放地图
     * @param deltaScale 
     * @param location 鼠标相对于左下角的位置
     */
    private scaleMap(deltaScale: number, location: Vec2) {
        let self = this;
        let scale = self.grp_scrollMap.scale.x + deltaScale;
        let editAreaWidth = self._editAreaSize.width;
        let editAreaHeight = self._editAreaSize.height;
        let minScale = Math.max(editAreaWidth / self.mapMgr.mapWidth, editAreaHeight / self.mapMgr.mapHeight);
        if (scale > 2) scale = 2;
        if (scale < minScale) scale = minScale;
        let mousePos = BaseUT.getMousePos(location);//这里不直接取evt.getLocation()，再封装一层是因为舞台缩放，会影响evt.getLocation()的坐标） 
        let localUIPos = self._scrollMapUITranstorm.convertToNodeSpaceAR(new Vec3(mousePos.x, mousePos.y, 0));
        self.grp_scrollMap.setScale(new Vec3(scale, scale, scale));//一定要设置z的scale，不然会影响转换成世界坐标的值
        let globalPos = self._scrollMapUITranstorm.convertToWorldSpaceAR(new Vec3(localUIPos.x, localUIPos.y, 0));
        let moveDelta = new Vec2(mousePos.x - globalPos.x, mousePos.y - globalPos.y);
        let toX = self.grp_scrollMap.position.x + moveDelta.x;
        let toY = self.grp_scrollMap.position.y + moveDelta.y;
        self.grp_scrollMap.setPosition(toX, toY);
        self.checkLimitPos();
        if (self.scaleCb) self.scaleCb.call(self.scaleCbCtx);
    }

    /**检测地图滚动容器边界 */
    private checkLimitPos() {
        let self = this;
        let maxScrollX = self.stageWidth - self._editAreaSize.width;
        let maxScrollY = self.stageHeight - self._editAreaSize.height;
        if (self.grp_scrollMap.position.x > 0) self.grp_scrollMap.setPosition(new Vec3(0, self.grp_scrollMap.position.y));
        if (self.grp_scrollMap.position.x < -maxScrollX) self.grp_scrollMap.setPosition(new Vec3(-maxScrollX, self.grp_scrollMap.position.y));
        if (self.grp_scrollMap.position.y > 0) self.grp_scrollMap.setPosition(new Vec3(self.grp_scrollMap.position.x, 0));
        if (self.grp_scrollMap.position.y < -maxScrollY) self.grp_scrollMap.setPosition(new Vec3(self.grp_scrollMap.position.x, -maxScrollY));
    }

    public get mapScale() {
        let self = this;
        return self.grp_scrollMap.scale.x;
    }

    private get stageWidth() {
        let self = this;
        return self.mapMgr.mapWidth * self.grp_scrollMap.scale.x;
    }

    private get stageHeight() {
        let self = this;
        return self.mapMgr.mapHeight * self.grp_scrollMap.scale.y;
    }

    private onKeyDown(event: EventKeyboard) {
        let self = this;
        switch (event.keyCode) {
            case KeyCode.SPACE:
                self._pressSpace = true;
                self.checkMousCursor();
                break;
        }
    }

    private onKeyUp(event: EventKeyboard) {
        let self = this;
        switch (event.keyCode) {
            case KeyCode.SPACE:
                self._pressSpace = false;
                self.checkMousCursor();
                break;
        }
    }

    private checkMousCursor() {
        let self = this;
        if (self._pressSpace && self._isInEditArea) {
            BaseUT.changeMouseCursor("move");
        } else {
            BaseUT.changeMouseCursor("auto");
        }
    }
}


