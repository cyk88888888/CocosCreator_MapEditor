/*
 * @Descripttion: 主界面底部选中页签
 * @Author: CYK
 * @Date: 2022-05-16 09:18:45
 */
import { Node, _decorator } from 'cc';
import { ResMgr } from '../../framework/mgr/ResMgr';
import { UIMenu } from '../../framework/ui/UIMenu';
import { ImgLoader } from '../../framework/uiComp/ImgLoader';
import List from '../../framework/uiComp/List';
import { EquipLayer } from './equip/EquipLayer';
import { HomeLayer } from './HomeLayer';
import { SettingLayer } from './setting/SettingLayer';
import { ShopLayer } from './shop/ShopLayer';
import { SkillLayer } from './skill/SkillLayer';
const { ccclass, property } = _decorator;

@ccclass('BottomTabLayer')
export class BottomTabLayer extends UIMenu {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/home/BottomTabLayer';
    @property(List)
    private list_tab: List = null;

    private _layerInfos: any[];
    private _toLayer: string;
    protected onEnter() {
        let self = this;
        self._layerInfos = [
            { layer: EquipLayer.__className, icon: 'ui/home/ico_zhuangbei', preRes: [EquipLayer.prefabUrl] },
            { layer: ShopLayer.__className, icon: 'ui/home/ico_shandian', preRes: [ShopLayer.prefabUrl] },
            { layer: HomeLayer.__className, icon: 'ui/home/ico_shijie', preRes: [HomeLayer.prefabUrl] },
            { layer: SkillLayer.__className, icon: 'ui/home/ico_tianfu', preRes: [SkillLayer.prefabUrl] },
            { layer: SettingLayer.__className, icon: 'ui/home/ico_shezhi', preRes: [SettingLayer.prefabUrl] },
        ];
    }

    protected onFirstEnter() {
        let self = this;
        this.list_tab.numItems = self._layerInfos.length;
        this.list_tab.selectedId = 2;
    }

    //水平列表渲染器
    onListHRender(item: Node, idx: number) {
        item.getChildByName('icon').getComponent(ImgLoader).url = this._layerInfos[idx].icon;
    }

    //当列表项被选择...
    onListSelected(item: Node, selectedIdx: number, lastSelectedIdx: number, val: number) {
        let self = this;
        let layerInfo = self._layerInfos[selectedIdx];
        let layerName = layerInfo.layer;
        self._toLayer = layerName;
        ResMgr.inst.loadWithoutJuHua(layerInfo.preRes, function () {
            if (self._toLayer != layerName) return;
            self.emit('jumpToLayer', { layerName: layerName });
        }, self);

    }
}

