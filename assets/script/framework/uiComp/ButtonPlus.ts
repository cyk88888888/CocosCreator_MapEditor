/*
 * @Descripttion: 按钮组件
 * @Author: CYK
 * @Date: 2022-06-21 10:01:02
 */
import { _decorator, Button, EventTouch, Node } from 'cc';
import { SoundMgr } from '../mgr/SoundMgr';
const { ccclass, property } = _decorator;

@ccclass('ButtonPlus')
export class ButtonPlus extends Button {
    onLoad() {
        this.node.on(Node.EventType.TOUCH_END, this.playClickSound, this);
    }

    public playClickSound() {
        SoundMgr.inst.playClickSound();
    }
}

