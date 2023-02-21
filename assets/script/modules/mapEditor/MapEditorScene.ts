/*
 * @Descripttion: 地图编辑器主界面
 * @Author: CYK
 * @Date: 2022-05-16 09:18:45
 */
import { _decorator } from 'cc';
import { UIScene } from '../../framework/ui/UIScene';

import { registerModule } from '../../framework/mgr/ModuleMgr';
import { MapEditorLayer } from './MapEditorLayer';
const { ccclass, property } = _decorator;

@ccclass('MapEditorScene')
export class MapEditorScene extends UIScene {
    private ctor() {
        let self = this;
        self.mainClassLayer = MapEditorLayer;
        let subLayerMgr = self.subLayerMgr;
        let classList = [];
        for (let i = 0; i < classList.length; i++) {
            subLayerMgr.register(classList[i]);
        }
    }

    private async onEnter() {

    }
}
registerModule(MapEditorScene, []);
