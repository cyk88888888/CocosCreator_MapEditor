import { _decorator, Button, EventMouse, instantiate, Label, Prefab, profiler, ScrollView, Vec2, Vec3 } from 'cc';
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
import { BaseUT } from '../../framework/base/BaseUtil';
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
    private lbl_grid: Label;
    @property({ type: Label })
    private lbl_path: Label;
    @property({ type: Label })
    private lbl_mapthing: Label;
    @property({ type: Label })
    private lbl_mapSize: Label;
    @property({ type: Label })
    private lbl_mapScale: Label;
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
    @property({ type: Node })
    private grp_dragMapthing: Node = null;
    @property({ type: Prefab })
    private mapThingComp: Prefab = null;

    private _selectIdx: number;
    /**当前拖拽的场景物件 */
    private _mapThingComp: Node;
    private _drawMapThingData: any;
    /**当前鼠标位置 */
    private _curLocation: Vec2;
    protected onEnter() {
        let self = this;
        self.onEmitter(CONST.GEVT.ImportMapJson, self.onImportMapJson);//导入josn地图数据成功
        self._selectIdx = 1;
        self.list_pathSize.selectedId = 0;
        self.mapScrollComp.scaleCbCtx = self;
        self.mapScrollComp.scaleCb = self.updateMapScale;
        self.showEditOperate();
    }

    private showEditOperate() {
        let self = this;
        self.grp_editPathSize.active = self._selectIdx == 0;
        self.grp_editPath.active = self._selectIdx == 1;
        self.grp_editMathing.active = self._selectIdx == 2;
    }

    private async onImportMapJson(data: any) {
        let self = this;
        let juhuaDlg = await JuHuaDlg.show();
        let scrollView = self.list_mapThing.getComponent(ScrollView);
        scrollView.stopAutoScroll();
        scrollView.scrollToTop();
        ResMgr.inst.decRefLocalImg();
        self.refreshList("list_mapThing");
        await self.mapScrollComp.onImportMapJson(data);
        juhuaDlg.close();
        self.updateMapInfo();
        self.initEvent();
        //清除上一次导入的地图资源
        await new Promise<void>((resolve, reject) => {
            self.setTimeout(() => {
                ResMgr.inst.relaseAllLocal();
                resolve();
            }, 500);
        })
    }

    /**导入成功后，更新显示地图数据 */
    private updateMapInfo() {
        let self = this;
        self.lbl_mapSize.string = `地图宽高：${MapMgr.inst.mapWidth}, ${MapMgr.inst.mapHeight}`;
        self.updateMapScale();
    }

    private updateMapScale() {
        let self = this;
        let scale = self.mapScrollComp.mapScale;
        self.lbl_mapScale.string = `地图缩放比例：${scale.toFixed(2)}`;
        if(self._mapThingComp) self._mapThingComp.setScale(new Vec3(scale, scale, scale));
    }

    private initEvent() {
        let self = this;
        self.node.on(Node.EventType.MOUSE_DOWN, self.onMouseDown, self);
        self.node.on(Node.EventType.MOUSE_MOVE, self.onMouseMove, self);
    }

    private _data_list_path() {
        let rst = [
            { gridType: CONST.GridType.GridType_walk, desc: "可行走点" },
            { gridType: CONST.GridType.GridType_start, desc: "起始地点" },
            { gridType: CONST.GridType.GridType_WaterVerts, desc: "落水点" }
        ];
        return rst;
    }

    private _data_list_pathSize() {
        let rst = [{ radius: 10, size: 0 }, { radius: 15, size: 1 }, { radius: 20, size: 3 }, { radius: 25, size: 5 }, { radius: 30, size: 7 }, { radius: 35, size: 9 }];
        return rst;
    }

    private _data_list_mapThing() {
        let rst = MapMgr.inst.mapThingArr || [];
        return rst;
    }

    private _select_list_path(data: any, selectedIdx: number, lastSelectedIdx: number) {
        let self = this;
        self.emit(CONST.GEVT.ChangeGridType, { gridType: data.gridType });
    }

    private _select_list_pathSize(data: any, selectedIdx: number, lastSelectedIdx: number) {
        let self = this;
        self.emit(CONST.GEVT.ChangeGridSize, { range: data.size });
    }

    private _select_list_mapThing(data: any, selectedIdx: number, lastSelectedIdx: number) {
        let self = this;
        self.newDragMapThing(data.nativePath);
    }

    private newDragMapThing(url: string) {
        let self = this;
        self.disposeDragMapThing();
        self._drawMapThingData = { url: url };
        self.emit(CONST.GEVT.ChangeGridType, { gridType: CONST.GridType.GridType_mapThing });
        let mapthingComp = self._mapThingComp = MapMgr.inst.getMapThingComp(self.mapThingComp, url);
        let scale = self.mapScrollComp.mapScale;
        let mousePos = BaseUT.getMousePos(self._curLocation);//这里不直接取evt.getLocation()，再封装一层是因为舞台缩放，会影响evt.getLocation()的坐标）
        mapthingComp.setPosition(mousePos.x, mousePos.y);
        mapthingComp.setParent(self.grp_dragMapthing);
        mapthingComp.setScale(new Vec3(scale, scale, scale));
    }

    private disposeDragMapThing() {
        let self = this;
        if (self._mapThingComp) {
            self._mapThingComp.destroy();
            self._mapThingComp = null;
        }
        self._drawMapThingData = null;
    }

    private onMouseDown(e: EventMouse) {
        let self = this;
        self._curLocation = e.getLocation();
        if (self._mapThingComp) {
            let mousePos = BaseUT.getMousePos(self._curLocation);//这里不直接取evt.getLocation()，再封装一层是因为舞台缩放，会影响evt.getLocation()的坐标）
            let limitPos = self.mapScrollComp.node.position;
            let size = BaseUT.getSize(self.mapScrollComp.node);
            if (mousePos.x > limitPos.x && mousePos.y > limitPos.y && mousePos.x < limitPos.x + size.width && mousePos.y < limitPos.y + size.height) {
                self.emit(CONST.GEVT.DragMapThingDown, {
                    url: self._drawMapThingData ? self._drawMapThingData.url : '',
                    taskId: self._drawMapThingData ? self._drawMapThingData.taskId : 0,
                    groupId: self._drawMapThingData ? self._drawMapThingData.groupId : 0,
                    type: self._drawMapThingData ? self._drawMapThingData.type : 0,
                    isByDrag: true
                });
            }
            self.disposeDragMapThing();
        }
    }

    private onMouseMove(e: EventMouse) {
        let self = this;
        if (self._mapThingComp) {
            let mousePos = BaseUT.getMousePos(e.getLocation());//这里不直接取evt.getLocation()，再封装一层是因为舞台缩放，会影响evt.getLocation()的坐标） 
            self._mapThingComp.setPosition(mousePos.x, mousePos.y);
        }
    }

    /** 打开文件选择器+读取数据 */
    private async _tap_btn_changeMap() {
        MapMgr.inst.changeMap();
    }

    /** 导出地图json数据 */
    private _tap_btn_exportJson() {
        MapMgr.inst.exportJson();
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
        self.lbl_grid.string = self.lbl_grid.string == "显示网格" ? "隐藏网格" : "显示网格";
        self.mapScrollComp.graphicsGrid.node.active = !self.mapScrollComp.graphicsGrid.node.active;
    }

    /**显隐路点 */
    private _tap_btn_showPath() {
        let self = this;
        self.lbl_path.string = self.lbl_path.string == "显示路点" ? "隐藏路点" : "显示路点";
        self.mapScrollComp.grp_colorGrid.active = !self.mapScrollComp.grp_colorGrid.active;
    }

    /**显隐物件 */
    private _tap_btn_showMapThing() {
        let self = this;
        self.lbl_mapthing.string = self.lbl_mapthing.string == "显示物件" ? "隐藏路点" : "显示物件";
    }

    /**重置缩放比例 */
    private _tap_btn_resetScale() {
        let self = this;
        self.mapScrollComp.resetScale();
        self.updateMapScale();
    }
}


