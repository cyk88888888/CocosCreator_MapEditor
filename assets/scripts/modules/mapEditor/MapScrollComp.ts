import { _decorator, EventKeyboard, EventMouse, Graphics, input, Input, KeyCode, Layout, Node, Size, Sprite, SpriteFrame, UITransform, Vec2, Vec3 } from 'cc';
import { UIComp } from '../../framework/ui/UIComp';
import { CONST } from '../base/CONST';
import { MapMgr } from '../base/MapMgr';
import { ResMgr } from '../../framework/mgr/ResMgr';
import { BaseUT } from '../../framework/base/BaseUtil';
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
    @property({ type: Graphics })
    public graphicsGrid: Graphics;

    /**编辑区域宽高 */
    private _editAreaSize: Size;
    private _pressSpace: boolean;
    private _isInEditArea: boolean;
    private _preUIPos: Vec2;
    private mapMgr: MapMgr;
    private _scrollMapUITranstorm: UITransform;
    protected onEnter(): void {
        let self = this;
        self.mapMgr = MapMgr.inst;
        self._scrollMapUITranstorm = self.grp_scrollMap.getComponent(UITransform);
    }

    public async onImportMapJson() {
        let self = this;
        await self.addMapSlices();
    }

    /**导入地图切片 */
    private async addMapSlices() {
        let self = this;
        self.grp_mapSlices.destroyAllChildren();
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
        self.emit(CONST.GEVT.UpdateMapInfo);
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

    private initGrid() {
        let self = this;
        let cellSize = self.mapMgr.cellSize;
        let numCols = Math.floor(self.mapMgr.mapWidth / cellSize);
        let numRows = Math.floor(self.mapMgr.mapHeight / cellSize);

        let lineGraphics = self.graphicsGrid;
        lineGraphics.clear();
        lineGraphics.lineWidth = 2;
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

    /**重置缩放比例 */
    public resetScale() {
        let self = this;
        let oldScale = self.grp_scrollMap.scale.x;
        if (oldScale == 1) return;//已经是初始缩放比例
        self.grp_scrollMap.setScale(new Vec3(1, 1, 1));
        let toX = self.grp_scrollMap.position.x - (self.grp_scrollMap.position.x / oldScale) + self._editAreaSize.width / 2;
        let toY = self.grp_scrollMap.position.y - (self.grp_scrollMap.position.y / oldScale) + self._editAreaSize.height / 2;
        self.grp_scrollMap.setPosition(new Vec3(toX, toY));
        self.checkLimitPos();
    }

    /**初始化事件 */
    private initEvent() {
        let self = this;
        self._editAreaSize = BaseUT.getSize(self.node);
        // this.node.on(Node.EventType.MOUSE_MOVE, this.onShowRoadMsg, self),
        self.node.on(Node.EventType.MOUSE_DOWN, self.onMouseDown, self);
        self.node.on(Node.EventType.MOUSE_UP, self.onMouseUp, self);
        self.node.on(Node.EventType.MOUSE_LEAVE, self.onMouseLeave, self);
        self.node.on(Node.EventType.MOUSE_WHEEL, self.onMouseWheel, self);
        self.node.on(Node.EventType.MOUSE_ENTER, self.onMouseEnter, self);

        input.on(Input.EventType.KEY_DOWN, self.onKeyDown, self);
        input.on(Input.EventType.KEY_UP, self.onKeyUp, self);
    }

    private onMouseDown(e: EventMouse) {
        let self = this;
        self._preUIPos = e.getUILocation();
        self.node.on(Node.EventType.MOUSE_MOVE, self.onMouseMove, self);
    }

    private onMouseMove(e: EventMouse) {
        let self = this;
        if (!self._pressSpace) return;
        let curUILocation = e.getUILocation();
        let deltaX = curUILocation.x - self._preUIPos.x;
        let deltaY = curUILocation.y - self._preUIPos.y;
        let toX = self.grp_scrollMap.position.x + deltaX;
        let toY = self.grp_scrollMap.position.y + deltaY;
        self.grp_scrollMap.setPosition(toX, toY);
        self._preUIPos = curUILocation;
        self.checkLimitPos();
    }

    private onMouseUp(e: EventMouse) {
        this.node.hasEventListener(Node.EventType.MOUSE_MOVE) && this.node.off(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
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
        event.getScrollY() > 0 ? this.scaleMap(.1, event) : this.scaleMap(-.1, event);
    }

    /** 缩放地图*/
    private scaleMap(deltaScale: number, evt: EventMouse) {
        let self = this;
        let scale = self.grp_scrollMap.scale.x + deltaScale;
        let editAreaWidth = self._editAreaSize.width;
        let editAreaHeight = self._editAreaSize.height;
        let minScale = Math.max(editAreaWidth / self.mapMgr.mapWidth, editAreaHeight / self.mapMgr.mapHeight);
        if (scale > 2) scale = 2;
        if (scale < minScale) scale = minScale;
        let location = evt.getLocation();
        let localUIPos = self._scrollMapUITranstorm.convertToNodeSpaceAR(new Vec3(location.x, location.y, 0));
        self.grp_scrollMap.setScale(new Vec3(scale, scale, scale));//一定要设置z的scale，不然会影响转换成世界坐标的值
        let globalPos = self._scrollMapUITranstorm.convertToWorldSpaceAR(new Vec3(localUIPos.x, localUIPos.y, 0));
        let moveDelta = new Vec2(location.x - globalPos.x, location.y - globalPos.y);
        let toX = self.grp_scrollMap.position.x + moveDelta.x;
        let toY = self.grp_scrollMap.position.y + moveDelta.y;
        self.grp_scrollMap.setPosition(toX, toY);
        self.checkLimitPos();
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
        if (self._pressSpace && self._isInEditArea) BaseUT.changeMouseCursor("move");
        else BaseUT.changeMouseCursor("auto");
    }
}


