import { Label, Sprite, SpriteFrame, UITransform, _decorator } from 'cc';
import { ListItem } from '../../../framework/uiComp/ListItem';
import { ResMgr } from '../../../framework/mgr/ResMgr';
const { ccclass, property } = _decorator;

@ccclass('MapThingIR')
export class MapThingIR extends ListItem {
    @property({ type: Sprite, tooltip: "物件资源图片" })
    private img_mapthing: Sprite;
    @property({ type: Label, tooltip: "物件名称" })
    private lbl_name: Label;
    protected dchg(): void {
        let self = this; 
        let data = self. data;
        self.lbl_name.string = data.sourceName;
        ResMgr.inst.loadLocalImg(data.nativePath, (spriteFrame: SpriteFrame) => {
            if(self.hasDestory) return;
            let uiTransform = self.img_mapthing.getComponent(UITransform);
            let normalSize = 112;
            let maxSize = Math.max(spriteFrame.width, spriteFrame.height);
            let scale = normalSize / maxSize;
            self.img_mapthing.spriteFrame = spriteFrame;
            uiTransform.width = spriteFrame.width * scale;
            uiTransform.height = spriteFrame.height * scale;
        }, self);
    }
}

