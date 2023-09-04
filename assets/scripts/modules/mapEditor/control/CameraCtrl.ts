import { Node, Size, Vec3, _decorator } from 'cc';
import { JoyStickCtrl } from './JoyStickCtrl';
import { MapMgr } from '../../base/MapMgr';
const { ccclass, property } = _decorator;

/**镜头控制器 */
@ccclass('CameraCtrl')
export class CameraCtrl {
    private grp_scrollMap: Node;
    private _target: Node;
    private _editAreaSize: Size;
    private mapMgr: MapMgr;
    private _offY: number;
    public constructor(grp_scrollMap: Node, mapViewSize: Size) {
        let self = this;
        self.mapMgr = MapMgr.inst;
        self.grp_scrollMap = grp_scrollMap;
        self._editAreaSize = mapViewSize;
        self._offY = 74 / 2 - 20 /2;//（角色高度一半） - （格子高度一半）
    }

    /**绑定跟随目标 */
    public focusTarget(target: Node) {
        let self = this;
        self._target = target;
        self.updateCameraPos();
    }

    public update(deltaTime: number) {
        let self = this;
        if (!self._target || !JoyStickCtrl.inst.isMoving) return;
        self.updateCameraPos();
    }

    private updateCameraPos() {
        let self = this;
        if (!self._target || !self.grp_scrollMap) return;
        let targetPos = self._target.position;
        self.grp_scrollMap.setPosition(-targetPos.x * self.mapScale + self._editAreaSize.width / 2, -targetPos.y * self.mapScale - self._offY + self._editAreaSize.height / 2);
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

    public clear() {
        let self = this;
        self._target = null;
    }
}