/*
 * @Descripttion: 说明
 * @Author: CYK
 * @Date: 2022-05-16 09:18:45
 */
import { _decorator, Node, ProgressBar } from 'cc';
import { UILayer } from '../../framework/ui/UILayer';

const { ccclass, property } = _decorator;

@ccclass('MapEditorLayer')
export class MapEditorLayer extends UILayer {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/mapEditor/MapEditorLayer';

    protected onEnter() {
        let self = this;
       
    }

 
}

