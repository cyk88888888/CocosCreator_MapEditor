import { Node, Size, _decorator } from 'cc';
import { EntityCtrl } from './EntityCtrl';
import { CameraCtrl } from './CameraCtrl';
import { TickMgr } from '../../../framework/mgr/TickMgr';
const { ccclass, property } = _decorator;

/**运行模式控制器 */
@ccclass('RunDemoCtrl')
export class RunDemoCtrl {
    private static _inst: RunDemoCtrl;
    public static get inst() {
        if (!this._inst) {
            this._inst = new RunDemoCtrl();
        }
        return this._inst;
    }
    public entity: EntityCtrl;
    public camera: CameraCtrl;

    public init(grp_scrollMap: Node, grp_entity: Node, mapViewSize: Size) {
        let self = this;
        if (!self.entity) self.entity = new EntityCtrl(grp_entity);
        if (!self.camera) self.camera = new CameraCtrl(grp_scrollMap, mapViewSize);
        self.camera.focusTarget(self.entity.player.node);
        TickMgr.inst.addTick(self.update, self);
    }

    public update(deltaTime: number) {
        let self = this;
        self.entity.update(deltaTime);
        self.camera.update(deltaTime);
    }

    public clear() {
        let self = this;
        TickMgr.inst.rmTick(self.update);
        self.camera.clear();
        self.camera = null;
        self.entity.clear();
        self.entity = null;
    }
}