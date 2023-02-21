/*
 * @Descripttion: 设置界面
 * @Author: CYK
 * @Date: 2022-05-16 09:18:45
 */
import { _decorator, Component, Node, ProgressBar, Button, Label } from 'cc';
import { SoundMgr } from '../../../framework/mgr/SoundMgr';
import { UILayer } from '../../../framework/ui/UILayer';
import { BagDlg } from '../../bag/BagDlg';
const { ccclass, property } = _decorator;

@ccclass('SettingLayer')
export class SettingLayer extends UILayer {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/home/SettingLayer';

    @property(Button)
    private btn_bag: Button;
    protected onEnter() {
        SoundMgr.inst.playBg('dy/sound/bg02');
    }

    update(deltaTime: number) {
    }

    private _tap_btn_bag(){
        BagDlg.show();
    }

}

