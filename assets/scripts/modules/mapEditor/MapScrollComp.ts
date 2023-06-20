import { _decorator, Button, Component, Event, EventKeyboard, EventMouse, EventTouch, game, input, Input, KeyCode, Layers, Layout, Node, ScrollView, Size, Sprite, SpriteFrame, UITransform, Vec2 } from 'cc';
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
    private grp_mapLayer: Node;
    @property({ type: Node, tooltip: "地图滚动容器" })
    private grp_scrollMap: Node;
    @property({ type: Node, tooltip: "地图切片容器" })
    private grp_mapSlices: Node;
    
    private _nodeSize: Size;
    private _pressSpace: boolean;
    private _isInEditArea: boolean;
    private _preUIPos: Vec2;
    private mapMgr: MapMgr;
    protected onEnter(): void {
        let self = this;
        self.mapMgr = MapMgr.inst;
    }
    public async onImportMapJson() {
        let self = this;
        await self.addMapSlices();
    }

    private async addMapSlices() {
        let self = this;
        self.grp_mapSlices.destroyAllChildren();
        self.grp_scrollMap.setPosition(0, 0);
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
        self.initEvent();
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

    private initEvent(){
        let self = this;
        self._nodeSize = BaseUT.getSize(self.node);
        // this.node.on(Node.EventType.MOUSE_MOVE, this.onShowRoadMsg, self),
        self.node.on(Node.EventType.MOUSE_DOWN, self.onMouseDown, self),
        self.node.on(Node.EventType.MOUSE_UP, self.onMouseUp, self),
        self.node.on(Node.EventType.MOUSE_LEAVE, self.onMouseLeave, self),
        self.node.on(Node.EventType.MOUSE_WHEEL, self.onMouseWheel, self),
        self.node.on(Node.EventType.MOUSE_ENTER, self.onMouseEnter, self),

        input.on(Input.EventType.KEY_DOWN, self.onKeyDown, self);
        input.on(Input.EventType.KEY_UP, self.onKeyUp, self);
    }

    private onMouseDown(e:EventMouse){
        let self = this;
        self._preUIPos = e.getUILocation();
        self.node.on(Node.EventType.MOUSE_MOVE, self.onMouseMove, self);
    }

    private onMouseMove(e:EventMouse){
        let self = this;
        if(!self._pressSpace) return;
        let curUILocation = e.getUILocation();
        let deltaX = curUILocation.x - self._preUIPos.x;
        let deltaY = curUILocation.y - self._preUIPos.y;
        let toX = self.grp_scrollMap.position.x + deltaX;
        let toY = self.grp_scrollMap.position.y + deltaY;
        let mapMgr = self.mapMgr;
        if(toX > 0) toX = 0;
        if(toY > 0) toY = 0;
        let maxScrollX = mapMgr.mapWidth - self._nodeSize.x;
        let maxScrollY = mapMgr.mapHeight - self._nodeSize.y;
        if(toX < -maxScrollX) toX = -maxScrollX;;
        if(toY < -maxScrollY) toY = -maxScrollY;
        self.grp_scrollMap.setPosition(toX, toY);
        self._preUIPos = curUILocation;
    }

    private onMouseUp(e:EventMouse){
        this.node.hasEventListener(Node.EventType.MOUSE_MOVE) && this.node.off(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
    }

    private onMouseEnter(e:EventMouse){
        let self = this;
        self._isInEditArea = true;
        self.checkMousCursor();
    }

    private onMouseLeave(e:EventMouse){
        let self = this;
        self._isInEditArea = false;
        self.checkMousCursor();
    }
    
    
    onMouseWheel(event:EventMouse) {
        console.log('event.getScrollX(): '+event.getScrollX(),'event.getScrollY(): '+event.getScrollY());
    }

    onKeyDown(event: EventKeyboard) {
        let self = this;
        switch(event.keyCode) {
            case KeyCode.SPACE:
                self._pressSpace = true;
                self.checkMousCursor();
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {
        let self = this;
        switch(event.keyCode) {
            case KeyCode.SPACE:
                self._pressSpace = false;
                self.checkMousCursor();
                break;
        }
    }

    private checkMousCursor(){
        let self = this;
        if(self._pressSpace && self._isInEditArea) BaseUT.changeMouseCursor("move");
        else BaseUT.changeMouseCursor("auto");
    }
}


