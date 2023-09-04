import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

/**摇杆控制器 */
@ccclass('JoyStickCtrl')
export class JoyStickCtrl {
    /** 当前摇杆弧度*/
    public radian: number;
    /**摇杆是否移动中 */
    public isMoving: boolean;
    private static _inst: JoyStickCtrl;
    public static get inst() {
        if (!this._inst) {
            this._inst = new JoyStickCtrl();
        }
        return this._inst;
    }

    public init() {

    }
}