/*
 * @Descripttion: 说明
 * @Author: CYK
 * @Date: 2022-05-16 09:18:45
 */
import { _decorator } from 'cc';
import { UIScene } from '../../framework/ui/UIScene';
import { LoadingLayer } from './LoadingLayer';
import { registerModule } from '../../framework/mgr/ModuleMgr';
const { ccclass, property } = _decorator;

@ccclass('LoadingScene')
export class LoadingScene extends UIScene {
    private ctor() {
        let self = this;
        self.mainClassLayer = LoadingLayer;
        let subLayerMgr = self.subLayerMgr;
        let classList = [];
        for (let i = 0; i < classList.length; i++) {
            subLayerMgr.register(classList[i]);
        }
    }

    private async onEnter() {

    }
}
registerModule(LoadingScene, ['dy/sp/pet']);
