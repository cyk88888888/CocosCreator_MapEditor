/*
 * @Descripttion: 主界面
 * @Author: CYK
 * @Date: 2022-05-16 09:18:45
 */
import { isDisplayStats, Label, Node, setDisplayStats, _decorator } from 'cc';
import { SceneMgr } from '../../framework/mgr/SceneMgr';
import { UIMenu } from '../../framework/ui/UIMenu';
import { ButtonPlus } from '../../framework/uiComp/ButtonPlus';
import { ListTestScene } from '../listTest/ListTestScene';
const { ccclass, property } = _decorator;

@ccclass('TopUsrInfoLayer')
export class TopUsrInfoLayer extends UIMenu {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/home/TopUsrInfoLayer';
    @property({type: Node, tooltip:'哈哈哈'})
    private grp_head: Node;
    @property({ type: Label })
    private lbl_name: Label;
    @property({ type: ButtonPlus })
    private btn_debug: Label;
    protected onEnter() {

    }

    update(deltaTime: number) {
    }

    private _tap_grp_head() {
        SceneMgr.inst.push(ListTestScene)
    }

    private _tap_btn_debug(){
        setDisplayStats(!isDisplayStats());
    }
}

