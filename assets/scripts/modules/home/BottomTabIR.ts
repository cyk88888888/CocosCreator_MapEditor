import { _decorator, Component, Label, Layout, Node, RichText, Sprite, SpriteFrame, UITransform, Vec3 } from 'cc';
import { UIComp } from '../../framework/ui/UIComp';
import { ListItem } from '../../framework/uiComp/ListItem';
import { ImgLoader } from '../../framework/uiComp/ImgLoader';
const { ccclass, property } = _decorator;

@ccclass('BottomTabIR')
export class BottomTabIR extends ListItem {

    protected dchg(): void {
        let self = this; 
        let data = self. data;
        self.node.getChildByName('icon').getComponent(ImgLoader).url = data.icon;
    }
}

