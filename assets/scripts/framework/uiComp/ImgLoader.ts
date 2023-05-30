/*
 * @Descripttion: 图片Sprite加载组件
 * @Author: CYK
 * @Date: 2022-06-15 17:01:50
 */
import { _decorator, Component, Node, Sprite, SpriteFrame, SpriteAtlas, ImageAsset, resources } from 'cc';
import { ResMgr } from '../mgr/ResMgr';
const { ccclass, property } = _decorator;

@ccclass('ImgLoader')
export class ImgLoader extends Component {
    private _sprite: Sprite;
    private _url: string;
    onLoad() {
        let self = this;
        self._sprite = this.node.getComponent(Sprite);
        if (!self._sprite) self._sprite = this.node.addComponent(Sprite);
    }

    public set url(value: string) {
        let self = this;
        if (self._url == value) return;
        self._url = value;
        if (value.startsWith('ui/')) {
            let atlassUrl = value.slice(0, value.lastIndexOf('/'));
            let spriteAtlas = <SpriteAtlas>ResMgr.inst.get(atlassUrl);
            if (!spriteAtlas) {
                ResMgr.inst.loadWithoutJuHua(atlassUrl, function () {
                    self._sprite.spriteFrame = <SpriteFrame>ResMgr.inst.get(value);
                }, self);
            } else {
                self._sprite.spriteFrame = <SpriteFrame>ResMgr.inst.get(value);
            }
        } else {
            if (self._url == '' || self._url == null || self._url == undefined) {
                self._sprite.spriteFrame = null;
                return;
            }
            let spriteFrameUrl = value + '/spriteFrame';
            ResMgr.inst.loadWithoutJuHua(spriteFrameUrl, function () {
                let spriteFrame = <SpriteFrame>ResMgr.inst.get(spriteFrameUrl);
                if (spriteFrame) self._sprite.spriteFrame = spriteFrame;
            }, self)
        }


    }
}

