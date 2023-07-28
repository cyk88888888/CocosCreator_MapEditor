/*
 * @Descripttion: 消息tip提示
 * @Author: CYK
 * @Date: 2022-06-16 09:20:47
 */

import { _decorator, Component, instantiate, Label, Prefab, resources, tween, Vec3 } from 'cc';
import { SceneMgr } from '../../../framework/mgr/SceneMgr';
const { ccclass, property } = _decorator;


@ccclass('MessageTip')
export class MessageTip extends Component {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/common/MessageTip';
    @property({ type: Label })
    public lbl_msg: Label;
    @property({ type: Label })
    public lbl_msg1: Label;

    public static async show(data?: { msg: string }): Promise<MessageTip> {
        let prefabPath = MessageTip.prefabUrl;
        let prefab = await new Promise<Prefab>((resolve, reject) => {
            let cachePrefab = resources.get(prefabPath);
            if (cachePrefab) {
                console.log('resName: ' + prefabPath + '加载完毕(缓存已有)');
                return resolve(cachePrefab as Prefab);
            } else {
                resources.load(prefabPath, Prefab, (err, prefab) => {
                    if (!err) {
                        console.log('resName: ' + prefabPath + '加载完毕');
                        resolve(prefab);
                    } else {
                        console.log('resName: ' + prefabPath + '加载失败');
                        reject(err);
                    }
                });
            }
        })
        let node = instantiate(prefab);
        let script = node.getComponent(MessageTip);
        script.setData(data);
        node.setParent(SceneMgr.inst.curScene.msg);
        return script;
    }

    public setData(data?: any) {
        let self = this;
        self.lbl_msg.string = self.lbl_msg1.string = data.msg;
        tween(self.node)
            .to(0.5, { position: new Vec3(0, 60, 0) }, { easing: 'elasticOut' })
            .delay(0.8)
            .call(() => {
                self.node.destroy();
            })
            .start()
    }
}

