/*
 * @Descripttion: 界面层级基类
 * @Author: CYK
 * @Date: 2022-05-12 09:23:41
 */
import { _decorator, Component, Node, instantiate, NodeEventType } from 'cc';
import { BaseUT } from '../base/BaseUtil';
import { ResMgr } from '../mgr/ResMgr';
import { SceneMgr } from '../mgr/SceneMgr';
import { UIComp } from './UIComp';
const { ccclass, property } = _decorator;

@ccclass('UILayer')
export class UILayer extends UIComp {

    private _oldParent: Node;
    public static async show(data?: any) {
      
        let prefab = await ResMgr.inst.loadPrefab(this.prefabUrl);
        const newNode = instantiate(prefab);
        // newNode.layer = Layers.Enum.UI_2D;
        let script = newNode.getComponent(this.name) as UILayer;
        if (!script) script = newNode.addComponent(this.name) as UILayer;
        BaseUT.setFitSize(script.node);
        script.setData(data);
        script.addToLayer();
        script.onAddToLayer();
        return script;
    }

    protected addToLayer() {
        let self = this;
        self.node.setParent(SceneMgr.inst.curScene.layer);
    }

    private onAddToLayer(){
        let self = this;
        self._oldParent = self.node.parent;
    }

    /**打开页面时的动画 */
    protected onOpenAnimation() { }
    /**关闭页面时的动画 */
    protected onCloseAnimation(callback?: Function) {
        if (callback) callback.call(this);
    }

    public addSelf() {
        this.node.setParent(this._oldParent);
    }

    public removeSelf() {
        let self = this;
        self.node.removeFromParent();
    }

    public close() {
        let self = this;
        self.onCloseAnimation(() => {
            self.destory();
        });
    }
}

