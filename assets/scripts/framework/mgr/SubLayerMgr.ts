/*
 * @Description: 子界面管理器
 * @Author: CYK
 * @Date: 2022-05-19 15:25:36
 */
import { js } from "cc";
import { UILayer } from "../ui/UILayer";
export class SubLayerMgr {
    private _classMap: any;
    public curLayer: UILayer;
    private _popArr: UILayer[];
    constructor() {
        this._classMap = {};
        this._popArr = [];
    }

    /**
     * 注册子页面
     * @param layerClass 
     */
    public register(layerClass: any, opt?: any) {
        let className = layerClass.__className;
        this._classMap[className] = layerClass;
    }

    /**显示指定界面（替换模式） */
    public run(LayerNameOrClass: string | typeof UILayer, data?: any) {
        this._show(LayerNameOrClass, data);
    }

    /**显示指定界面（入栈模式） */
    public push(LayerNameOrClass: string | typeof UILayer, data?: any) {
        this._show(LayerNameOrClass, data, true);
    }

    private async _show(LayerNameOrClass: string | typeof UILayer, data?: any, toPush?: boolean) {
        let script: any = typeof LayerNameOrClass === 'string' ? js.getClassByName(LayerNameOrClass) : LayerNameOrClass;
        let layerName = script.name;

        if (this.curLayer && this.curLayer.scriptName == layerName) return;//打开同个界面
        
        let registerLayer = this._classMap[layerName];
        let needDestory = !registerLayer && !toPush;//未注册  && 非入栈模式

        this.checkDestoryLastLayer(needDestory);

        if (this.curLayer) {
            if (toPush) this._popArr.push(this.curLayer);
            if (toPush || !needDestory) {
                this.curLayer.removeSelf();
            }
        }

        if (registerLayer && registerLayer.node) {
            this.curLayer = registerLayer;
            this.curLayer.addSelf();
            return;
        }

        this.curLayer = await script.show(data);
        if (this._classMap[layerName]) {
            this._classMap[layerName] = this.curLayer;
        }
    }

    /**判断销毁上个界面并释放资源 */
    private checkDestoryLastLayer(destory?: boolean) {
        if (destory && this.curLayer && !this.curLayer.hasDestory) {
            this.curLayer.close();
        }
    }

    /** layer出栈*/
    public pop() {
        let self = this;
        if (self._popArr.length <= 0) {
            console.error('已经pop到底了!');
            return;
        }
        self.checkDestoryLastLayer(true);
        self.curLayer = self._popArr.pop();
        self.curLayer.addSelf();
    }

    /**清除所有注册的layer */
    public releaseAllLayer() {
        let self = this;
        this.checkDestoryLastLayer(true);
        for (let i = 0; i < self._popArr.length; i++) {
            let layer = this._popArr[i];
            if (!layer.hasDestory) layer.close();
        }

        for (let key in this._classMap) {
            let layer = this._classMap[key];
            if (layer.node && !layer.hasDestory) {
                layer.close();
            }
        }

        self._popArr = [];
    }

    public dispose() {
        let self = this;
        self.releaseAllLayer();
        self._classMap = null;
        self._popArr = null;
    }
}
