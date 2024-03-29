import { Label, Node, SpriteFrame, UITransform, _decorator } from 'cc';
import { ListItem } from '../../../../../extensions/cocos-framework/src/uiComp/ListItem';
import { ImgLoader } from '../../../../../extensions/cocos-framework/src/uiComp/ImgLoader';
import { BaseUT } from '../../../../../extensions/cocos-framework/src/base/BaseUtil';
const { ccclass, property } = _decorator;

@ccclass('MapThingIR')
export class MapThingIR extends ListItem {
    @property({ type: Node, tooltip: "物件资源图片" })
    private img_mapthing: Node;
    @property({ type: Label, tooltip: "物件名称" })
    private lbl_name: Label;
    protected dchg(): void {
        let self = this; 
        let data = self. data;
        self.lbl_name.string = data.thingName;
        let loader = self.img_mapthing.getComponent(ImgLoader);
        loader.loadComplete = function(spriteFrame: SpriteFrame) {
            let normalSize = 70;
            let maxSize = Math.max(spriteFrame.width, spriteFrame.height);
            let scale = normalSize / maxSize;
            BaseUT.setSize(self.img_mapthing, spriteFrame.width * scale,spriteFrame.height * scale);
        }
        loader.ctx = self; 
        loader.url = data.nativePath;
    }
}

