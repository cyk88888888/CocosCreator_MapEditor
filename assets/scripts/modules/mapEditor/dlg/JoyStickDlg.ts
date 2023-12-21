import { _decorator, EventMouse, EventTouch, Node, UITransform, Vec2, Vec3 } from 'cc';
import { JoyStickCtrl } from '../control/JoyStickCtrl';
import { UIDlg } from '../../../../../extensions/cocos-framework/src/ui/UIDlg';
const { ccclass, property } = _decorator;

@ccclass('JoyStickDlg')
export class JoyStickDlg extends UIDlg {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/mapEditor/dlg/JoyStickDlg';

    @property({ type: Node })
    private grp_joyStick: Node;
    @property({ type: Node })
    private grp_touchArea: Node;
    @property({ type: Node })
    private joyStick: Node;
    /**半径 */
    private radius: number;
    private _touchStartPos: Vec2;
    private _initPos: Vec3;

    private _joyStickCtrl: JoyStickCtrl;
    protected ctor(): void {
        let self = this;
        self.outSideClosed = false;
        self.maskEnabled = false;
        self.penetrable = true;
        self.radius = 18;
        self._joyStickCtrl = JoyStickCtrl.inst;
    }

    protected onEnter(): void {
        let self = this;
        self.grp_touchArea.on(Node.EventType.TOUCH_START, self.onMouseDown, self);
        self.grp_touchArea.on(Node.EventType.TOUCH_END, self.onMouseUp, self);
        self.grp_touchArea.on(Node.EventType.TOUCH_CANCEL, self.onMouseUp, self);
        self._initPos = new Vec3(self.grp_joyStick.position.x, self.grp_joyStick.position.y);
    }

    private onMouseDown(e: EventTouch) {
        let self = this;
        self._touchStartPos = e.getUILocation();
        self.grp_joyStick.setPosition(self._touchStartPos.x, self._touchStartPos.y);
        self.grp_touchArea.on(Node.EventType.TOUCH_MOVE, self.onMouseMove, self);
        self.joyStick.setPosition(new Vec3(0, 0, 0));
    }

    private onMouseMove(e: EventTouch) {
        let self = this;
        let moveUIPos = e.getUILocation();
        let distance = Vec2.distance(moveUIPos, self._touchStartPos);
        if(distance == 0) return;
        let radian = Math.atan2(moveUIPos.y - self._touchStartPos.y, moveUIPos.x - self._touchStartPos.x);
        if (distance > self.radius) distance = self.radius;
        let toX = distance * Math.cos(radian);
        let toY = distance * Math.sin(radian);
        self.joyStick.setPosition(new Vec3(toX, toY, 0));
        self._joyStickCtrl.isMoving = true;
        self._joyStickCtrl.radian = radian;
    }

    private onMouseUp(e: EventTouch) {
        let self = this;
        this.grp_touchArea.off(Node.EventType.TOUCH_MOVE, this.onMouseMove, this);
        self.grp_joyStick.setPosition(self._initPos);
        self.joyStick.setPosition(new Vec3(0, 0, 0));
        self._joyStickCtrl.isMoving = false;
        self._joyStickCtrl.radian = undefined;
    }

    protected onExit(): void {
        let self = this;
        self.grp_touchArea.off(Node.EventType.TOUCH_START, self.onMouseDown, self);
        self.grp_touchArea.off(Node.EventType.TOUCH_END, self.onMouseUp, self);
        self.grp_touchArea.off(Node.EventType.TOUCH_CANCEL, self.onMouseUp, self);
        self._joyStickCtrl.isMoving = false;
        self._joyStickCtrl.radian = undefined;
    }

}


