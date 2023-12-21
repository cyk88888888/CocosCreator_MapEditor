import { _decorator, profiler } from 'cc';
import { MapEditorLayer } from './MapEditorLayer';
import { UIScene } from '../../../../extensions/cocos-framework/src/ui/UIScene';
import { registerModule } from '../../../../extensions/cocos-framework/src/mgr/ModuleMgr';
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
