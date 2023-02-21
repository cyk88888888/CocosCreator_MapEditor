import { Main } from "../../Main";
/*
 * @Description: 帧管理器
 * @Author: CYK
 * @Date: 2022-06-09 23:46:58
 */
export class TickMgr {
    public mainNode: Main;
    private static _inst: TickMgr;
    public static get inst() {
        if (!this._inst) {
            this._inst = new TickMgr();
        }
        return this._inst;
    }

    private _tickMap: { [tickName: string]: IData_Tick };
    /**全局帧执行方法 */
    public onTick(dt: number) {
        if (this._tickMap) {
            for (let tickName in this._tickMap) {
                let item = this._tickMap[tickName];
                item.cb.call(item.ctx, dt);
            }
        }
    }

    /**
     * 添加帧执行器
     * @param tickName 
     * @param cb 
     */
    public addTick(tickName: string, data: IData_Tick) {
        if (!this._tickMap) this._tickMap = {};
        this._tickMap[tickName] = data;
    }

    /**移除帧执行器 */
    public rmTick(tickName: string) {
        if (this._tickMap && this._tickMap[tickName]) {
            delete this._tickMap[tickName];
        }
    }

    /**延迟一帧执行 */
    public nextTick(callback: Function, ctx: any) {
        this.mainNode.scheduleOnce(function () {
            if (callback) callback.call(ctx);
        })
    }
}

export interface IData_Tick {
    cb: Function;
    ctx: any;
}
