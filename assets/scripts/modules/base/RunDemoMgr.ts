import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

/**测试运行管理器 */
@ccclass('RunDemoMgr')
export class RunDemoMgr {
    /** 是否测试运行模式*/
    public isRunningDemoMode: boolean;
    private static _inst: RunDemoMgr;
    public static get inst() {
        if (!this._inst) {
            this._inst = new RunDemoMgr();
        }
        return this._inst;
    }
}