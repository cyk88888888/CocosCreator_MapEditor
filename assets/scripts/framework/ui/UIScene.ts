import { UITransform, _decorator, js } from 'cc';
import { SubLayerMgr } from '../mgr/SubLayerMgr';
import { UILayer } from './UILayer';
import { emmiter } from '../base/Emmiter';
import { BaseUT } from '../base/BaseUtil';
import { Component, Node} from 'cc';
import { SceneMgr } from '../mgr/SceneMgr';
const { ccclass } = _decorator;
/** 
 * @descripttion UI场景基类
 * @author cyk
 * @date 2022-05-20 09:53:17
 */
@ccclass('UIScene')
export class UIScene extends Component{
    protected mainClassLayer: typeof UILayer;
    protected subLayerMgr: SubLayerMgr;
    public layer: Node;
    public dlg: Node;
    public msg: Node;
    public menuLayer: Node;

    public isEnter: boolean;
    public isDestory: boolean;
    private _moduleParam: any;
    private _isFirstEnter: boolean = true;
    private _emmitMap: { [event: string]: Function };//已注册的监听事件列表
    __preload() {
        let self = this;
        self.subLayerMgr = new SubLayerMgr();
        self.ctor_b();
        self.ctor();
        self.ctor_a();
        BaseUT.setFitSize(this.node);
    }

    protected ctor_b() { }

    protected ctor() { }

    protected ctor_a() { }

    protected onEnter_b() { }

    protected onEnter() { }

    protected onFirstEnter() { }

    protected onEnter_a() { }

    protected onExit_b() { }

    protected onExit() { }

    protected onExit_a() { }

    protected onEmitter(event: string, listener: any) {
        let self = this;
        emmiter.on(event, listener, self);
        if (!self._emmitMap) self._emmitMap = {};
        self._emmitMap[event] = listener;
    }

    protected unEmitter(event: string, listener: any) {
        let self = this;
        emmiter.off(event, listener, self);
    }

    protected emit(event: string, data?: any) {
        emmiter.emit(event, data)
    }

    public get className() {
        return js.getClassName(this);
    }
    
    onLoad(){
        let self = this;
        self.initLayer();
        if (self.mainClassLayer) {
            self.subLayerMgr.register(self.mainClassLayer);
            self.push(self.mainClassLayer, { str: '我叫' + self.mainClassLayer.__className });
        }
    }

    public get uiTransform() {
        let self = this;
        return self.getComponent(UITransform);
    }

    private initLayer() {
        let self = this;
        self.layer = self.addGCom2GRoot('UILayer');
        self.menuLayer = self.addGCom2GRoot('UIMenuLayer');
        self.dlg = self.addGCom2GRoot('UIDlg');
        self.msg = self.addGCom2GRoot('UIMsg');
    }

    /**
    * 添加层级容器到GRoot
    * @param name 名称
    * @returns 
    */
    private addGCom2GRoot(name: string, isScene?: boolean): Node {
        let newNode = BaseUT.newUINode(name);
        newNode.setParent(this.node);
        BaseUT.setFitSize(newNode);
        return newNode;
    }

    private __doEnter(){
        let self = this;
        if(self.isEnter) return;
        self.isEnter = true;
        console.log('进入场景：' + self.className);
        self.onEnter_b();
        self.onEnter();
        if (self._isFirstEnter) {
            self._isFirstEnter = false;
            self.onFirstEnter();
        }
        self.onEnter_a();
    }

    public setData(data: any) {
        this._moduleParam = data;
    }

    onEnable(){
        let self = this;
        self.__doEnter();
    }

    onDisable(){
        let self = this;
        self.__dispose();
    }

    /**重置到主界面（会清掉当前堆栈中的所有界面） */
    public resetToMain() {
        let self = this;
        self.releaseAllLayer();
        self.push(self.mainClassLayer, {});
    }

    /**显示指定界面（替换模式） */
    public run(LayerNameOrClass: string | typeof UILayer, data?: any) {
        this.subLayerMgr.run(LayerNameOrClass, data);
    }

    /**显示指定界面（入栈模式） */
    public push(LayerNameOrClass: string | typeof UILayer, data?: any) {
        this.subLayerMgr.push(LayerNameOrClass, data);
    }

    /**layer出栈 */
    public pop() {
        this.subLayerMgr.pop();
    }

    /**将场景添加到canvas根节点 */
    public addToGRoot() {
        SceneMgr.inst.getCanvas().insertChild(this.node, 1);
    }

    public removeFromParent() {
        this.node.removeFromParent();
    }

    /**清除所有layer */
    public releaseAllLayer() {
        this.subLayerMgr.releaseAllLayer();
    }

    public disposeSubLayerMgr() {
        this.subLayerMgr.dispose();
        this.subLayerMgr = null;
    }

    private __dispose() {
        let self = this;
        if(!self.isEnter) return;
        self.isEnter = false;;
        if (self._emmitMap) {
            for (let event in self._emmitMap) {
                self.unEmitter(event, self._emmitMap[event]);
            }
            self._emmitMap = null;
        }
        console.log('退出场景：' + self.className);
        this.onExit_b();
        self.onExit();
        this.onExit_a();
    }

    public destory() {
        this.__dispose();
        this.subLayerMgr.dispose();
        this.subLayerMgr = null;
        this.node.destroy();
    }
    
    onDestroy(){
        let self = this;
        self.isDestory = true;
        // console.log('onDestroy: ' + this.className);
    }
}

