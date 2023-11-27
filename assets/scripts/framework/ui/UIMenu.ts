import { _decorator, Component, Node } from 'cc';
import { SceneMgr } from '../mgr/SceneMgr';
import { UILayer } from './UILayer';
const { ccclass, property } = _decorator;
/** 
 * @descripttion 菜单层级基类
 * @author cyk
 * @date 2022-05-12 09:23:41
 */
@ccclass('UIMenu')
export class UIMenu extends UILayer {
    protected addToLayer(){
        this.node.setParent(SceneMgr.inst.curScene.menuLayer);
    }
}

