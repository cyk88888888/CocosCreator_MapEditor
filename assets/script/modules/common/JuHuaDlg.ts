/*
 * @Descripttion: 转圈等待
 * @Author: CYK
 * @Date: 2022-06-13 14:50:10
 */
import { Node, Quat, Vec3, _decorator } from 'cc';
import { UIMsg } from '../../framework/ui/UIMsg';
const { ccclass, property } = _decorator;

@ccclass('JuHuaDlg')
export class JuHuaDlg extends UIMsg {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/common/JuHuaDlg';
    @property(Node)
    private img_maskBg: Node;

    protected onEnter() {
        let self = this;
        self.img_maskBg.active = false;
        self.setTimeout(() => {
            self.img_maskBg.active = true;
            let img_wait = self.img_maskBg.getChildByName('img_wait');
            self.getTween(img_wait)
                .to(1, {
                    angle: 360,
                })
                .set({ angle: 0 })
                .union()
                .repeatForever()
                .start();
        }, 4000);
    }
}

