import { _decorator, Component, Label, Layout, Node, RichText, Sprite, SpriteFrame, UITransform, Vec3 } from 'cc';
import { UIComp } from '../../framework/ui/UIComp';
import { ListItem } from '../../framework/uiComp/ListItem';
const { ccclass, property } = _decorator;

@ccclass('ChatIR')
export class ChatIR extends ListItem {
    @property(SpriteFrame)
    avatar1SF: SpriteFrame = null;
    @property(SpriteFrame)
    avatar2SF: SpriteFrame = null;
    @property(SpriteFrame)
    bubble1SF: SpriteFrame = null;
    @property(SpriteFrame)
    bubble2SF: SpriteFrame = null;

    protected dchg(): void {
        let self = this; 
        let data = self. data;
        console.log(data);

        let itemUt: UITransform = self.node.getComponent(UITransform);
        let avatarNode: Node = self.node.getChildByName('avatarNode');
        let avatar: Sprite = avatarNode.getComponentInChildren(Sprite);
        let timeNode: Node = self.node.getChildByName('timeNode');
        let timeLayout: Layout = timeNode.getComponent(Layout);
        let time: Label = timeNode.getComponentInChildren(Label);
        let chatBg: Sprite = self.node.getChildByName('chatBg').getComponent(Sprite);
        let chatBgUt: UITransform = chatBg.node.getComponent(UITransform);
        let chatBgLayout: Layout = chatBg.node.getComponent(Layout);
        let richtext: RichText = chatBg.node.getComponentInChildren(RichText);

        avatarNode.active = chatBg.node.active = data.type != 3;
        timeNode.active = data.type == 3;

        let h: number;
        let minH: number = 80;
        let offset: number = 43;

        switch (data.type) {
            case 1://对方
                avatarNode.setPosition(new Vec3(-247, -40));
                avatar.spriteFrame = this.avatar1SF;
                chatBg.spriteFrame = this.bubble1SF;
                chatBg.node.setPosition(new Vec3(-75, -20));
                richtext.node.setPosition(new Vec3(-108, -7));
                richtext.string = `<color=#030303>${data.text}</c>`;
                chatBgLayout.updateLayout();
                h = chatBg.node.getPosition().y + chatBgUt.height + offset;
                itemUt.height = h < minH ? minH : h;
                break;
            case 2://我方
                avatarNode.setPosition(new Vec3(247, -40));
                avatar.spriteFrame = this.avatar2SF;
                chatBg.spriteFrame = this.bubble2SF;
                chatBg.node.setPosition(new Vec3(75, -20));
                richtext.node.setPosition(new Vec3(-122, -7));
                richtext.string = `<color=#030303>${data.text}</c>`;
                chatBgLayout.updateLayout();
                h = chatBg.node.getPosition().y + chatBgUt.height + offset;
                itemUt.height = h < minH ? minH : h;
                break;
            case 3://时间 或 其他啥的
                time.string = data.text;
                itemUt.height = 60;
                break;
        }
    }
}

