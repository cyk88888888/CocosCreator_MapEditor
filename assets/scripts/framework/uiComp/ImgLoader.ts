import { _decorator, Component, Node, Sprite, SpriteFrame, SpriteAtlas, ImageAsset, resources } from 'cc';
import { ResMgr } from '../mgr/ResMgr';
const { ccclass, property } = _decorator;
/** 
 * @descripttion 图片Sprite加载组件
 * @author cyk
 * @date 2022-06-15 17:01:50
 */
@ccclass('ImgLoader')
export class ImgLoader extends Component {
    private _sprite: Sprite;
    private _url: string;
    public loadComplete: Function;
    public ctx: any;
    onLoad() {
        let self = this;
        self._sprite = this.node.getComponent(Sprite);
        if (!self._sprite) self._sprite = this.node.addComponent(Sprite);
        if(self._url) {
            let oldUrl = self._url;
            self._url = null;
            self.url = oldUrl;
        }
    }

    public set url(value: string) {
        let self = this;
        if (self._url == value) return;
        self._url = value;
        if (value.startsWith('blob')) {
            ResMgr.inst.loadLocalImg(self._url, (spriteFrame: SpriteFrame) => {
                if(self._sprite) {
                    self._sprite.spriteFrame = spriteFrame;
                    if(self.loadComplete) self.loadComplete.call(self.ctx, spriteFrame);
                }
            }, self);
        }else if (value.startsWith('ui/')) {
            let atlassUrl = value.slice(0, value.lastIndexOf('/'));
            let spriteAtlas = <SpriteAtlas>ResMgr.inst.get(atlassUrl);
            if (!spriteAtlas) {
                ResMgr.inst.loadWithoutJuHua(atlassUrl, function () {
                    if(self._sprite) {
                        let spriteFrame = ResMgr.inst.get(value);
                        self._sprite.spriteFrame = <SpriteFrame>spriteFrame;
                        if(self.loadComplete) self.loadComplete.call(self.ctx, spriteFrame);
                    }
                }, self);
            } else {
                if(self._sprite) {
                    let spriteFrame = ResMgr.inst.get(value);
                    self._sprite.spriteFrame = <SpriteFrame>spriteFrame;
                    if(self.loadComplete) self.loadComplete.call(self.ctx, spriteFrame);
                }
            }
        } else {
            if (self._url == '' || self._url == null || self._url == undefined) {
                self._sprite.spriteFrame = null;
                return;
            }
            let spriteFrameUrl = value + '/spriteFrame';
            ResMgr.inst.loadWithoutJuHua(spriteFrameUrl, function () {
                if(self._sprite) {
                    let spriteFrame = ResMgr.inst.get(value);
                    self._sprite.spriteFrame = <SpriteFrame>spriteFrame;
                    if(self.loadComplete) self.loadComplete.call(self.ctx, spriteFrame);
                }
            }, self)
        }


    }
}

