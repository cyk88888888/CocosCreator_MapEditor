/*
 * @Descripttion: 技能界面
 * @Author: CYK
 * @Date: 2022-05-16 09:18:45
 */
import { _decorator, Component, Node, ProgressBar, Button, Label, VideoPlayer, Vec3, ImageAsset, SpriteAtlas, resources } from 'cc';
import { BaseUT } from '../../../framework/base/BaseUtil';
import { ResMgr } from '../../../framework/mgr/ResMgr';
import { SoundMgr } from '../../../framework/mgr/SoundMgr';
import { UILayer } from '../../../framework/ui/UILayer';
const { ccclass, property } = _decorator;

@ccclass('SkillLayer')
export class SkillLayer extends UILayer {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/home/SkillLayer';
    @property({ type: VideoPlayer })
    public videoPlayer: VideoPlayer;
    protected onEnter() {
        SoundMgr.inst.stopBg();
        let scale = BaseUT.getFitY(0.6, 0.8);
        this.videoPlayer.node.setScale(new Vec3(scale, scale, 1));
        this.videoPlayer.play();
    }

    update(deltaTime: number) {
    }

    protected onExit() {
        SoundMgr.inst.recoverBg();
        this.videoPlayer.pause();
    }

}

