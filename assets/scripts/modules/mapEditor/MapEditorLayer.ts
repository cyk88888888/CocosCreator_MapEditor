import { _decorator, Button, Label, profiler, ScrollView } from 'cc';
import { UILayer } from '../../framework/ui/UILayer';
import { FileIOHandler } from '../../framework/mgr/FileIOHandler';
import { MapScrollComp } from './MapScrollComp';
import { MapMgr } from '../base/MapMgr';
import { EventTouch } from 'cc';
import { Node } from 'cc';
import { List } from '../../framework/uiComp/List';
import { CONST } from '../base/CONST';
import { JuHuaDlg } from '../../framework/ui/JuHuaDlg';
import { ResMgr } from '../../framework/mgr/ResMgr';
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
    private btn_profiler: Button;
    @property({ type: Button })
    private btn_resetScale: Button;
    @property({ type: Label })
    private lbl_mapSize: Label;

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

    private async onImportMapJson() {
        let self = this;
        let juhuaDlg = await JuHuaDlg.show();
        let scrollView = self.list_mapThing.getComponent(ScrollView);
        scrollView.stopAutoScroll();
        scrollView.scrollToTop();
        ResMgr.inst.decRefLocalImg();
        self.refreshList("list_mapThing");
        await self.mapScrollComp.onImportMapJson();
        juhuaDlg.close();
        self.updateMapInfo();
        //清除上一次导入的地图资源
        await new Promise<void>((resolve, reject) => {
            self.setTimeout(() => {
                ResMgr.inst.relaseAllLocal();
                resolve();
            },500);
        })
    }

    /**导入成功后，更新显示地图数据 */
    private updateMapInfo(){
        let self = this;
        self.lbl_mapSize.string = `地图宽高：${MapMgr.inst.mapWidth},${MapMgr.inst.mapHeight}`;
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

    /** 显隐fps*/
    private _tap_btn_profiler() {
        profiler.isShowingStats() ? profiler.hideStats() : profiler.showStats();
    }

    /** 选中对应编辑页签*/
    private select_toogle_group(event: EventTouch, index: any) {
        let self = this;
        let selectIdx = Number(index);
        if (self._selectIdx == selectIdx) return;
        self._selectIdx = selectIdx;
        self.showEditOperate();
    }

    /**显隐网格 */
    private _tap_btn_showGrid() {
        let self = this;
        self.mapScrollComp.graphicsGrid.node.active = !self.mapScrollComp.graphicsGrid.node.active;
    }

    private _tap_btn_resetScale(){
        let self = this;
        self.mapScrollComp.resetScale();
    }
}


