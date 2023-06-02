import { _decorator, Button } from 'cc';
import { UILayer } from '../../framework/ui/UILayer';
import { FileIOHandler } from '../../framework/mgr/FileIOHandler';
import { MapScrollComp } from './MapScrollComp';
import { MapMgr } from '../base/MapMgr';
import { EventTouch } from 'cc';
import { Node } from 'cc';
import { List } from '../../framework/uiComp/List';
import { CONST } from '../base/CONST';
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
    @property({ type: MapScrollComp, tooltip: "编辑器地图滚动组件" })
    private mapScrollComp: MapScrollComp;
    @property({ type: Node })
    private grp_editPathSize: Node;
    @property({ type: Node })
    private grp_editPath: Node;
    @property({ type: Node })
    private grp_editMathing: Node;
    @property({ type: List })
    private list_mapThing: List = null;
    @property({ type: List })
    private list_pathSize: List = null;
    @property({ type: List })
    private list_path: List = null;


    private _selectIdx: number;
    protected onEnter() {
        let self = this;
        self.onEmitter(CONST.GEVT.ImportMapJson, self.onImportMapJson);//导入josn地图数据成功
        self._selectIdx = 1;
        self.list_pathSize.selectedId = 0;
        self.showEditOperate();
    }

    private showEditOperate() {
        let self = this;
        self.grp_editPathSize.active = self._selectIdx == 0;
        self.grp_editPath.active = self._selectIdx == 1;
        self.grp_editMathing.active = self._selectIdx == 2;
    }

    private onImportMapJson() {
        let self = this;
        if(self.list_mapThing.content) self.list_mapThing.content.setPosition(0,0);
        self.refreshList("list_mapThing");
    }

    private _data_list_path() {
        let rst = [
            { pathType: CONST.PathType.GridType_walk, desc: "可行走点" },
            { pathType: CONST.PathType.GridType_start, desc: "起始地点" },
            { pathType: CONST.PathType.GridType_WaterVerts, desc: "落水点" }
        ];
        return rst;
    }

    private _data_list_pathSize() {
        let rst = [{ radius: 10, size: 0 }, { radius: 15, size: 2 }, { radius: 20, size: 4 }, { radius: 25, size: 6 }, { radius: 30, size: 8 }];
        return rst;
    }

    private _data_list_mapThing() {
        let rst = MapMgr.inst.mapThingArr || [];
        return rst;
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

    private select_toogle_group(event: EventTouch, clickData: any) {
        let self = this;
        let selectIdx = Number(clickData);
        if (self._selectIdx == selectIdx) return;
        self._selectIdx = selectIdx;
        self.showEditOperate();
    }
}


