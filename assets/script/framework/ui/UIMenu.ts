/*
 * @Descripttion: 消息码层级基类
 * @Author: CYK
 * @Date: 2022-05-12 09:23:41
 */
import { _decorator, Component, Node } from 'cc';
import { SceneMgr } from '../mgr/SceneMgr';
import { UILayer } from './UILayer';
const { ccclass, property } = _decorator;

@ccclass('UIMenu')
export class UIMenu extends UILayer {
    protected addToLayer(){
        this.node.setParent(SceneMgr.inst.curScene.menuLayer);
    }
}

