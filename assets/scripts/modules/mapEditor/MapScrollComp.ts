import { _decorator, Button, Component, Event, EventKeyboard, EventMouse, EventTouch, input, Input, KeyCode, Layers, Layout, Node, ScrollView, Size, Sprite, SpriteFrame, UITransform, Vec2 } from 'cc';
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
    private _preUIPos: Vec2;

    public async onImportMapJson() {
        let self = this;
        await self.addMapSlices();
    }

    private async addMapSlices() {
        let self = this;
        self.grp_mapSlices.destroyAllChildren();
        self.grp_scrollMap.setPosition(0, 0);
        let mapMgr = MapMgr.inst;
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
        // this.node.on(Node.EventType.MOUSE_MOVE, this.onShowRoadMsg, this),
        self.node.on(Node.EventType.MOUSE_DOWN, self.onMouseDown, this),
        self.node.on(Node.EventType.MOUSE_UP, self.onMouseUp, this),
        self.node.on(Node.EventType.MOUSE_LEAVE, self.onMouseUp, this),
        self.node.on(Node.EventType.MOUSE_WHEEL, self.onMouseWheel, this),

        input.on(Input.EventType.KEY_DOWN, self.onKeyDown, self);
        input.on(Input.EventType.KEY_UP, self.onKeyUp, self);
    }

    private onMouseDown(e:EventMouse){
        this._preUIPos = e.getUILocation();
        this.node.on(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
    }

    private onMouseMove(e:EventMouse){
        let self = this;
        if(!self._pressSpace) return;
        console.log('e.getUILocation(): ' +e.getUILocation());
        console.log('e.getLocation(): ' +e.getLocation());
        console.log('e.getUIDelta(): ' +e.getUIDelta());
        let curUILocation = e.getUILocation();
        let deltaX = curUILocation.x - this._preUIPos.x;
        let deltaY = curUILocation.y - this._preUIPos.y;
        let toX = self.grp_scrollMap.position.x + deltaX;
        let toY = self.grp_scrollMap.position.y + deltaY;
        let mapMgr = MapMgr.inst;
        if(toX < 0) toX = 0;
        if(toY < 0) toY = 0;
        if(toX > mapMgr.mapWidth - self._nodeSize.x) toX = mapMgr.mapWidth - self._nodeSize.x;
        if(toY > mapMgr.mapHeight - self._nodeSize.y) toY = mapMgr.mapHeight - self._nodeSize.y;
        self.grp_scrollMap.setPosition(toX, toY);
    }

    private onMouseUp(e:EventMouse){
        this.node.hasEventListener(Node.EventType.MOUSE_MOVE) && this.node.off(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
    }

    onMouseWheel(event:EventMouse) {
        console.log('event.getScrollX(): '+event.getScrollX(),'event.getScrollY(): '+event.getScrollY());
    }

    onKeyDown(event: EventKeyboard) {
        let self = this;
        switch(event.keyCode) {
            case KeyCode.SPACE:
                self._pressSpace = true;
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {
        let self = this;
        switch(event.keyCode) {
            case KeyCode.SPACE:
                self._pressSpace = false;
                break;
        }
    }

}


