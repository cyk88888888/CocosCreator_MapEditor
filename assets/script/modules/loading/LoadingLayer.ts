/*
 * @Descripttion: 说明
 * @Author: CYK
 * @Date: 2022-05-16 09:18:45
 */
import { _decorator, Node, ProgressBar } from 'cc';
import { UILayer } from '../../framework/ui/UILayer';
import { SceneMgr } from '../../framework/mgr/SceneMgr';
import { ResMgr } from '../../framework/mgr/ResMgr';
import { HomeLayer } from '../home/HomeLayer';
import { HomeScene } from '../home/HomeScene';
import { TopUsrInfoLayer } from '../home/TopUsrInfoLayer';
import { BottomTabLayer } from '../home/BottomTabLayer';
const { ccclass, property } = _decorator;

@ccclass('LoadingLayer')
export class LoadingLayer extends UILayer {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/loading/LoadingLayer';
    @property({ type: ProgressBar })
    private progressBar: ProgressBar;
    private _isLoadingHome: boolean;

    private _preResList: string[];
    private _toPercent: number;
    protected onEnter() {
        let self = this;
        self._preResList = ['ui/common', HomeLayer.prefabUrl, TopUsrInfoLayer.prefabUrl, BottomTabLayer.prefabUrl];
        let curDownLoadNum: number = 0;//当前已下载个数
        let initPercent = self._toPercent = 0.4;//默认加载到40%
        ResMgr.inst.loadToWithItor('HomeScene', self._preResList, () => {
            curDownLoadNum++;
            self._toPercent = initPercent + (curDownLoadNum / self._preResList.length) * 0.6;
        });
    }

    update(dt: number) {
        let self = this;
        if (self.progressBar && self.progressBar.progress < self._toPercent) {
            self.progressBar.progress += 0.005;
            if (!self._isLoadingHome && self.progressBar.progress >= 1) {
                self._isLoadingHome = true;
                SceneMgr.inst.run(HomeScene);
            }
        }
    }
}

