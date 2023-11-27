import { _decorator, Button, EventTouch, Node } from 'cc';
import { SoundMgr } from '../mgr/SoundMgr';
const { ccclass, property } = _decorator;
/** 
 * @descripttion 按钮组件
 * @author cyk
 * @date 2022-06-21 10:01:02
 */
@ccclass('ButtonPlus')
export class ButtonPlus extends Button {
    onLoad() {
        this.node.on(Node.EventType.TOUCH_END, this.playClickSound, this);
    }

    public playClickSound() {
        SoundMgr.inst.playClickSound();
    }
}

