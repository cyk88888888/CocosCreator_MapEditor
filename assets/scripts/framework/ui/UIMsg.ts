import { _decorator, Component, Node } from 'cc';
import { SceneMgr } from '../mgr/SceneMgr';
import { UILayer } from './UILayer';
const { ccclass, property } = _decorator;
/** 
 * @descripttion 消息码层级基类
 * @author cyk
 * @date 2022-05-12 09:23:41
 */
@ccclass('UIMsg')
export class UIMsg extends UILayer {
    protected addToLayer(){
        this.node.setParent(SceneMgr.inst.curScene.msg);
    }
}

