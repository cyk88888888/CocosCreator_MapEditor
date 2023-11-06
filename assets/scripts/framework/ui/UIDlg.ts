/*
 * @Descripttion: 弹窗层级基类
 * @Author: CYK
 * @Date: 2022-05-12 09:23:41
 */
import { _decorator, Node, Color, Graphics, Vec3, BlockInputEvents } from 'cc';
import { BaseUT } from '../base/BaseUtil';
import { SceneMgr } from '../mgr/SceneMgr';
import { UILayer } from './UILayer';
const { ccclass, property } = _decorator;

@ccclass('UIDlg')
export class UIDlg extends UILayer {
    private dlgMaskName = '__bgMask';//弹窗底部灰色rect名称
    /**灰色遮罩是否可点击 */
    private _clickBgMask: boolean;
    /**灰色遮罩是否启用 */
    private _maskEnabled: boolean
    /** 是否可穿透*/
    private _penetrable: boolean;
    private _bgMaskNode: Node;
    protected addToLayer() {
        let self = this;
        let bgMaskNode = self._bgMaskNode = BaseUT.newUINode(self.dlgMaskName);
        let stageSize = BaseUT.getStageSize();
        self.maskEnabled = true;
        BaseUT.setSize(bgMaskNode, stageSize.width, stageSize.height);
        bgMaskNode.setParent(SceneMgr.inst.curScene.dlg);

        BaseUT.setPivot(self.node, 0.5, 0.5);
        self.node.setParent(SceneMgr.inst.curScene.dlg);

        self.onOpenAnimation();
    }

    private resetParent() {
        let self = this;
        if (self._bgMaskNode) {
            if(!self._penetrable) self._bgMaskNode.addComponent(BlockInputEvents);
            self.node.insertChild(self._bgMaskNode, 0);
        }
    }

    protected onOpenAnimation() {
        let self = this;
        self.getTween(self.node)
            .to(0.1, { scale: new Vec3(1.1, 1.1, 1) })
            .to(0.1, { scale: new Vec3(1, 1, 1) }) // 缩放缓动
            .call(() => {
                self.resetParent();
            })
            .start()
    }

    protected onCloseAnimation(cb: Function) {
        cb.call(this);
    }

    /**灰色遮罩是否可点击 */
    protected set outSideClosed(value: boolean) {
        let self = this;
        if (self._clickBgMask == value) return;
        self._clickBgMask = value;
        if (value) {
            self._bgMaskNode.on(Node.EventType.TOUCH_END, self.close, self);
        } else {
            self.offBgMaskClick();
        }
    }

    /**灰色遮罩是否启用 */
    protected set maskEnabled(value: boolean) {
        let self = this;
        if (self._maskEnabled == value) return;
        self._maskEnabled = value;
        let stageSize = BaseUT.getStageSize();
        let bgGraphic = self._bgMaskNode.getComponent(Graphics);
        if(!bgGraphic){
            bgGraphic = self._bgMaskNode.addComponent(Graphics);
        }
        let alpha = value ? 0.4 : 0;
        let modalLayerColor: Color = new Color(0x00, 0x00, 0x00, 255 * alpha);
        bgGraphic.clear();
        bgGraphic.fillColor = modalLayerColor;
        bgGraphic.rect(-stageSize.width / 2, -stageSize.height / 2, stageSize.width, stageSize.height);
        bgGraphic.fill();
    }

    private offBgMaskClick() {
        let self = this;
        if (self._bgMaskNode) {
            self._bgMaskNode.off(Node.EventType.TOUCH_END, self.close, self);
        }
    }

    /** 是否可穿透*/
    protected set penetrable(value: boolean){
        let self = this;
        if(self._penetrable == value) return;
        self._penetrable = value;
    }
}

