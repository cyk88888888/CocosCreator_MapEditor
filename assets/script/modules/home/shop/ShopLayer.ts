/*
 * @Descripttion: 商城界面
 * @Author: CYK
 * @Date: 2022-05-16 09:18:45
 */
import { _decorator, Component, Node, ProgressBar, Button, Label } from 'cc';
import { SoundMgr } from '../../../framework/mgr/SoundMgr';
import { UILayer } from '../../../framework/ui/UILayer';
const { ccclass, property } = _decorator;

@ccclass('ShopLayer')
export class ShopLayer extends UILayer {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/home/ShopLayer';
    protected onEnter() {
        SoundMgr.inst.playBg('dy/sound/bg03');
    }

    update(deltaTime: number) {
    }

}

