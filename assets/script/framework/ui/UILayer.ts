/*
 * @Descripttion: 说明
 * @Author: CYK
 * @Date: 2022-05-12 09:23:41
 */
import { _decorator, Component, Node, instantiate, Layers } from 'cc';
import { BaseUT } from '../base/BaseUtil';
import { ResMgr } from '../mgr/ResMgr';
import { SceneMgr } from '../mgr/SceneMgr';
import { UIComp } from './UIComp';
const { ccclass, property } = _decorator;

@ccclass('UILayer')
export class UILayer extends UIComp {

    public static async show(data?: any) {
        let prefab = await ResMgr.inst.loadPrefab(this.prefabUrl);
        const newNode = instantiate(prefab);
        newNode.layer = Layers.Enum.UI_2D;
        let script = newNode.getComponent(this.name) as UILayer;
        if(!script) script = newNode.addComponent(this.name) as UILayer;
        BaseUT.setFitSize(script.node);
        script.setData(data);
        script.addToLayer();
        return script;
    }

    protected addToLayer() {
        this.node.setParent(SceneMgr.inst.curScene.layer);
    }
}

