/*
 * @Descripttion: 测试组件
 * @Author: CYK
 * @Date: 2022-05-16 09:18:45
 */
import { Label, Node, _decorator } from 'cc';
import { UIComp } from '../../framework/ui/UIComp';
const { ccclass, property } = _decorator;

@ccclass('TestComp')
export class TestComp extends UIComp {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/home/TestComp';
    @property({type: Node, tooltip:'哈哈哈'})
    private grp_head: Node;
    @property({ type: Label })
    private lbl_name: Label;
    protected onEnter() {

    }

    update(deltaTime: number) {
    }
}

