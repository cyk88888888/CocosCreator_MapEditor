import { _decorator, profiler } from 'cc';
import { UIScene } from '../../framework/ui/UIScene';
import { registerModule } from '../../framework/mgr/ModuleMgr';
import { MapEditorLayer } from './MapEditorLayer';
const { ccclass, property } = _decorator;
/** 
 * @descripttion 首页场景
 * @author cyk
 * @date 2023-05-30 23:00:00
 */
@ccclass('MapEditorScene')
export class MapEditorScene extends UIScene {
    protected ctor() {
        let self = this;
        self.mainClassLayer = MapEditorLayer;
        let subLayerMgr = self.subLayerMgr;
        let classList = []; 
        for (let i = 0; i < classList.length; i++) {
            subLayerMgr.register(classList[i]);
        }
    }

    protected onEnter() {
        profiler.hideStats()
    }
}
registerModule(MapEditorScene, ['ui/grid']);
