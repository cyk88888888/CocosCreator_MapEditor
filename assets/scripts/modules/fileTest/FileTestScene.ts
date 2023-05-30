/*
 * @Descripttion: 文件测试场景类
 * @Author: CYK
 * @Date: 2022-05-16 09:18:45
 */
import { _decorator } from "cc";
import { UIScene } from "../../framework/ui/UIScene";
import { registerModule } from "../../framework/mgr/ModuleMgr";
import { FileTestLayer } from "./FileTestLayer";
const { ccclass, property } = _decorator;
@ccclass('FileTestScene')
export class FileTestScene extends UIScene {
    protected ctor() {
        let self = this;
        self.mainClassLayer = FileTestLayer;
        let subLayerMgr = self.subLayerMgr;
        let classList = [];
        for (let i = 0; i < classList.length; i++) {
            subLayerMgr.register(classList[i]);
        }
    }
}
registerModule(FileTestScene, [FileTestLayer.prefabUrl]);