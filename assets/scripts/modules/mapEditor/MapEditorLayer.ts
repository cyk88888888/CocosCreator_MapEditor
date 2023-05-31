import { _decorator, Button, Component, Node } from 'cc';
import { UILayer } from '../../framework/ui/UILayer';
import { FileIOHandler } from '../../framework/mgr/FileIOHandler';
import { MapScrollComp } from './MapScrollComp';
import { MapMgr } from '../base/MapMgr';
const { ccclass, property } = _decorator;

/*
 * @Descripttion: 编辑器首页
 * @Author: CYK
 * @Date: 2023-05-30 23:00:00
 */
@ccclass('MapEditorLayer')
export class MapEditorLayer extends UILayer {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/mapEditor/MapEditorLayer';
    @property({ type: Button })
    private btn_changeMap: Button;
    @property({ type: Button })
    private btn_exportJson: Button;
    @property({ type: Button })
    private btn_runDemo: Button;
    @property({ type: Button })
    private btn_showGrid: Button;
    @property({ type: Button })
    private btn_showPath: Button;
    @property({ type: Button })
    private btn_showMapThing: Button;
    @property({ type: Button })
    private btn_gridSize: Button;
    @property({ type: Button })
    private btn_editPath: Button;
    @property({ type: Button })
    private btn_putMapThing: Button;
    @property({ type: MapScrollComp, tooltip:"编辑器地图滚动组件" })
    private mapScrollComp: MapScrollComp;

    protected onEnter() {
        let self = this;
    }

    
    /** 打开文件选择器+读取数据 */
    private async _tap_btn_changeMap() {
        MapMgr.inst.changeMap();
    }

     /** 保存数据到文件 */
     private _tap_btn_exportJson() {
        let list = [{ type: 1, aa: 5 }, { type: 3, bb: 66 }, { desc: "我终于搞定web文件存储到本地了!!!" }];
        FileIOHandler.inst.saveTextToLocal(JSON.stringify(list));
    }
}


