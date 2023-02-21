/*
 * @Descripttion: 说明
 * @Author: CYK
 * @Date: 2022-06-16 09:20:47
 */

import { _decorator, Component, Node, Label, Tween, Vec3, tween } from 'cc';
import { UIMsg } from '../../../framework/ui/UIMsg';
const { ccclass, property } = _decorator;


@ccclass('MessageTip')
export class MessageTip extends UIMsg {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/common/MessageTip';
    @property({ type: Label })
    public lbl_msg: Label;
    @property({ type: Label })
    public lbl_msg1: Label;
    protected dchg() {
        let self = this;
        let data = self.data;
        self.lbl_msg.string = self.lbl_msg1.string = data.msg;
        self.getTween(this.node)
            .to(0.5, { position: new Vec3(0, 60, 0) }, { easing: 'elasticOut' })
            .delay(0.8)
            .call(()=>{
                self.close();
            })
            .start()
    }

}

