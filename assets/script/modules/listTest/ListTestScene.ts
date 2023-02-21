/*
 * @Descripttion: 说明
 * @Author: CYK
 * @Date: 2022-05-16 09:18:45
 */
import { _decorator } from "cc";
import { UIScene } from "../../framework/ui/UIScene";
import { registerModule } from "../../framework/mgr/ModuleMgr";
import { ListTestLayer } from "./ListTestLayer";
const { ccclass, property } = _decorator;
@ccclass('ListTestScene')
export class ListTestScene extends UIScene {
    private ctor() {
        let self = this;
        self.mainClassLayer = ListTestLayer;
        let subLayerMgr = self.subLayerMgr;
        let classList = [];
        for (let i = 0; i < classList.length; i++) {
            subLayerMgr.register(classList[i]);
        }
    }
}
registerModule(ListTestScene, [ListTestLayer.prefabUrl]);