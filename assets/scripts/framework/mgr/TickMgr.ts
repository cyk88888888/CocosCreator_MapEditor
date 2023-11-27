import { Main } from "../../Main";
/** 
 * @descripttion 自定义帧管理器
 * @author cyk
 * @date 2022-06-09 23:46:58
 */
export class TickMgr {
    public mainNode: Main;
    private _tickIndex: number;
    private _tickMap: { [tickName: string]: IData_Tick };

    private static _inst: TickMgr;
    public static get inst() {
        if (!this._inst) {
            this._inst = new TickMgr();
        }
        return this._inst;
    }

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
     * @param cb 
     * @param ctx
     */
    public addTick(cb: Function, ctx?: any) {
        if (!this._tickMap) {
            this._tickIndex = 0;
            this._tickMap = {};
        }
        let tickIndex = cb['__tickIndex__'];
        if (tickIndex && this._tickMap[tickIndex]) return;
        let index = ++this._tickIndex;
        cb['__tickIndex__'] = index;
        this._tickMap[index] = { cb: cb, ctx: ctx };
    }

    /**移除帧执行器 */
    public rmTick(cb: Function) {
        let tickIndex = cb['__tickIndex__'];
        if (this._tickMap && this._tickMap[tickIndex]) {
            delete cb['__tickIndex__'];
            delete this._tickMap[tickIndex];
        }
    }

    /**延迟一帧执行 */
    public nextTick(callback: Function, ctx?: any) {
        this.mainNode.scheduleOnce(function () {
            if (callback) callback.call(ctx);
        })
    }
}

export interface IData_Tick {
    cb: Function;
    ctx: any;
}
