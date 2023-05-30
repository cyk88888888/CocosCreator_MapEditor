/*
 * @Descripttion: 聊天列表测试场景类
 * @Author: CYK
 * @Date: 2023-04-12 23:23:20
 */
import { _decorator } from "cc";
import { UIScene } from "../../framework/ui/UIScene";
import { registerModule } from "../../framework/mgr/ModuleMgr";
import { ChatLayer } from "./ChatLayer";
const { ccclass, property } = _decorator;
@ccclass('ChatScene')
export class ChatScene extends UIScene {
    protected ctor() {
        let self = this;
        self.mainClassLayer = ChatLayer;
        let subLayerMgr = self.subLayerMgr;
        let classList = [];
        for (let i = 0; i < classList.length; i++) {
            subLayerMgr.register(classList[i]);
        }
    }
}
registerModule(ChatScene, ['ui/chat', 'ui/chatEmoji', ChatLayer.prefabUrl]);