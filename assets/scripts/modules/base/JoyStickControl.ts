import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

/**摇杆控制类 */
@ccclass('JoyStickControl')
export class JoyStickControl {
    /** 当前摇杆弧度*/
    public radian: number;
    /**摇杆是否移动中 */
    public isMoving: boolean;
    private static _inst: JoyStickControl;
    public static get inst() {
        if (!this._inst) {
            this._inst = new JoyStickControl();
        }
        return this._inst;
    }
}