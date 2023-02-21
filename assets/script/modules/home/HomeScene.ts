/*
 * @Descripttion: 主界面场景
 * @Author: CYK
 * @Date: 2022-05-16 09:18:45
 */
import { _decorator } from 'cc';
import { UIScene } from '../../framework/ui/UIScene';
import { HomeLayer } from './HomeLayer';
import { registerModule } from '../../framework/mgr/ModuleMgr';
import { TopUsrInfoLayer } from './TopUsrInfoLayer';
import { BottomTabLayer } from './BottomTabLayer';
import { SoundMgr } from '../../framework/mgr/SoundMgr';
import { EquipLayer } from './equip/EquipLayer';
import { SettingLayer } from './setting/SettingLayer';
import { ShopLayer } from './shop/ShopLayer';
import { SkillLayer } from './skill/SkillLayer';
const { ccclass, property } = _decorator;

@ccclass('HomeScene')
export class HomeScene extends UIScene {
    private _topUsrInfo: any;
    private _bottomTab: any;
    private ctor() {
        let self = this;
        self.mainClassLayer = HomeLayer;
        let subLayerMgr = self.subLayerMgr;
        let classList = [SettingLayer, EquipLayer, ShopLayer, SkillLayer];
        for (let i = 0; i < classList.length; i++) {
            subLayerMgr.register(classList[i]);
        }
    }

    private async onEnter() {
        let self = this;
        self.onEmitter('jumpToLayer', self.jumpToLayer);
        if (!self._topUsrInfo) self._topUsrInfo = await TopUsrInfoLayer.show();
        if (!self._bottomTab) self._bottomTab = await BottomTabLayer.show();
    }

    private jumpToLayer(data: any) {
        let self = this;
        if (!data) {
            console.error('跳转数据为null');
            return;
        }
        self.run(data.layerName);
    }

    private onExit() {
        SoundMgr.inst.playMainBg();
    }
}
registerModule(HomeScene, ['ui/home']);
