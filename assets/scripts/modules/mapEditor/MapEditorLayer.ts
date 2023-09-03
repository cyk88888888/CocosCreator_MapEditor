import { _decorator, Button, EventMouse, Label, Prefab, profiler, ScrollView, Toggle, Vec2, Vec3 } from 'cc';
import { UILayer } from '../../framework/ui/UILayer';
import { MapScrollComp } from './comp/MapScrollComp';
import { MapMgr } from '../base/MapMgr';
import { Node } from 'cc';
import { List } from '../../framework/uiComp/List';
import { CONST } from '../base/CONST';
import { JuHuaDlg } from '../../framework/ui/JuHuaDlg';
import { ResMgr } from '../../framework/mgr/ResMgr';
import { BaseUT } from '../../framework/base/BaseUtil';
import { G } from '../base/Interface';
import { MapThingPropertyComp } from './comp/MapThingPropertyComp';
import { HelpDlg } from './dlg/HelpDlg';
import { MessageTip } from '../common/message/MessageTip';
import PathFindingAgent from '../road/PathFindingAgent';
import { JoyStickDlg } from './dlg/JoyStickDlg';
import { EntityMgr } from './entity/mgr/EntityMgr';
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
    @property({ type: Label })
    private lbl_version: Label;
    @property({ type: Button })
    private btn_create: Button;
    @property({ type: Button })
    private btn_open: Button;
    @property({ type: Button })
    private btn_save: Button;
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
    @property({ type: Button })
    private btn_help: Button;
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
    @property({ type: Label })
    private lbl_runDemo: Label;
    @property({ type: MapScrollComp, tooltip: "编辑器地图滚动组件" })
    private mapScrollComp: MapScrollComp;
    @property({ type: MapThingPropertyComp })
    private mapThingPropertyComp: MapThingPropertyComp;
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

    private mapMgr: MapMgr;
    private _selectIdx: number;
    /**当前拖拽的场景物件 */
    private _mapThingComp: Node;
    private _drawMapThingData: G.DragMapthingInfo;
    /**当前鼠标位置 */
    private _curLocation: Vec2;
    private _listPathDataList: { gridType: CONST.GridType, desc: string }[];
    private _tid: number;
    protected onEnter() {
        let self = this;
        self.mapMgr = MapMgr.inst;
        self.onEmitter(CONST.GEVT.ImportMapJson, self.onImportMapJson);//导入josn地图数据成功
        self.onEmitter(CONST.GEVT.UpdateMapScale, self.updateMapScale);//地图缩放变更
        self.onEmitter(CONST.GEVT.DragMapThingStart, self.onDragMapThingStart);
        self.lbl_version.string = `version: ${self.mapMgr.version}`;
        self._selectIdx = 1;
        self.list_pathSize.selectedId = 0;
        self.showEditOperate();
    }

    private showEditOperate() {
        let self = this;
        self.grp_editPathSize.active = self._selectIdx == 0;
        self.grp_editPath.active = self._selectIdx == 1;
        self.grp_editMathing.active = self._selectIdx == 2;
        if (self._selectIdx == 1) {
            self.emit(CONST.GEVT.ChangeGridType, { gridType: self.list_path.selectedId != -1 ? self._listPathDataList[self.list_path.selectedId].gridType : CONST.GridType.GridType_none });
        } else if (self._selectIdx == 2) {
            self.emit(CONST.GEVT.ChangeGridType, { gridType: CONST.GridType.GridType_mapThing });
        }
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
        self.mapThingPropertyComp.init(data);
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
        self.lbl_mapSize.string = `地图宽高：${self.mapMgr.mapWidth}, ${self.mapMgr.mapHeight}`;
        self.updateMapScale();
    }

    private updateMapScale() {
        let self = this;
        let scale = self.mapScrollComp.mapScale;
        self.lbl_mapScale.string = `地图缩放比例：${scale.toFixed(2)}`;
        if (self._mapThingComp) self._mapThingComp.setScale(new Vec3(scale, scale, scale));
    }

    private initEvent() {
        let self = this;
        self.node.on(Node.EventType.MOUSE_DOWN, self.onMouseDown, self);
        self.node.on(Node.EventType.MOUSE_MOVE, self.onMouseMove, self);
    }

    private _data_list_path() {
        let self = this;
        let rst = [
            { gridType: CONST.GridType.GridType_walk, desc: "可行走点" },
            { gridType: CONST.GridType.GridType_start, desc: "起始地点" },
            { gridType: CONST.GridType.GridType_WaterVerts, desc: "落水点" }
        ];
        self._listPathDataList = rst;
        return rst;
    }

    private _data_list_pathSize() {
        let rst = [{ radius: 10, size: 0 }, { radius: 15, size: 1 }, { radius: 20, size: 3 }, { radius: 25, size: 5 }, { radius: 30, size: 7 }, { radius: 35, size: 9 }];
        return rst;
    }

    private _data_list_mapThing() {
        let self = this;
        let rst = [];
        let mapThingUrlMap = self.mapMgr.mapThingUrlMap;
        for (let key in mapThingUrlMap) {
            rst.push({ thingName: key, nativePath: mapThingUrlMap[key] });
        }
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
        self._drawMapThingData = { url: data.nativePath, thingName: data.thingName };
    }

    /**开始拖拽场景已有的物件**/
    private onDragMapThingStart(data: G.DragMapthingInfo) {
        let self = this;
        self.newDragMapThing(data.url);
        self._drawMapThingData = {
            url: data.url,
            thingName: data.thingName,
            taskId: data.taskId,
            groupId: data.groupId,
            type: data.type,
            groupIdStr: data.groupIdStr
        };
    }

    private newDragMapThing(url: string) {
        let self = this;
        self.mapMgr.isForbidDrawGrid = true;
        self.disposeDragMapThing();
        let mapthingComp = self._mapThingComp = self.mapMgr.getMapThingComp(self.mapThingComp, url);
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
        let buttonId = e.getButton();
        if (buttonId == EventMouse.BUTTON_LEFT) {
            if (!self.mapMgr.isPressSpace) {
                if (self._mapThingComp) {
                    if (self.mapScrollComp.isInEditArea) {
                        let mousePos = BaseUT.getMousePos(self._curLocation);//这里不直接取evt.getLocation()，再封装一层是因为舞台缩放，会影响evt.getLocation()的坐标） 
                        let localUIPos = self.mapScrollComp.scrollMapUITranstorm.convertToNodeSpaceAR(new Vec3(mousePos.x, mousePos.y, 0));
                        self.emit(CONST.GEVT.DragMapThingDown, <G.DragMapthingInfo>{
                            x: localUIPos.x,
                            y: localUIPos.y,
                            url: self._drawMapThingData.url,
                            thingName: self._drawMapThingData.thingName,
                            taskId: self._drawMapThingData.taskId || 0,
                            groupId: self._drawMapThingData.groupId || 0,
                            groupIdStr: self._drawMapThingData.groupIdStr || 0,
                            type: self._drawMapThingData.type || 0,
                            isByDrag: true
                        });
                    }
                    self.disposeDragMapThing();
                    self.clearTimeout(self._tid);
                    self._tid = self.setTimeout(() => {//延迟0.1秒，这样做是为了在切换选中不同场景物件时，不会选中后就马上绘制触发区域格子
                        self.mapMgr.isForbidDrawGrid = false;
                    }, 200);
                }
            }
        }
    }

    private onMouseMove(e: EventMouse) {
        let self = this;
        self._curLocation = e.getLocation();
        if (self._mapThingComp) {
            let mousePos = BaseUT.getMousePos(self._curLocation);//这里不直接取evt.getLocation()，再封装一层是因为舞台缩放，会影响evt.getLocation()的坐标） 
            self._mapThingComp.setPosition(mousePos.x, mousePos.y);
        }
    }

    /** 新建地图目录结构 */
    private _tap_btn_create() {
        MessageTip.show({ msg: "功能开发中....." });
    }

    /** 打开文件选择器+读取数据 */
    private _tap_btn_open() {
        let self = this;
        self.mapMgr.openMap();
    }

    /** 导出地图json数据 */
    private _tap_btn_save() {
        let self = this;
        self.mapMgr.exportJson();
    }

    /** 显隐fps*/
    private _tap_btn_profiler() {
        profiler.isShowingStats() ? profiler.hideStats() : profiler.showStats();
    }

    /** 打开帮助*/
    private _tap_btn_help() {
        HelpDlg.show();
    }

    /** 选中对应编辑页签*/
    private select_toogle_group(event: Toggle) {
        let self = this;
        let curTarget = event.node;
        let selectIdx = event.node.parent.children.indexOf(curTarget);
        if (selectIdx == -1 || self._selectIdx == selectIdx) return;
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
        self.lbl_mapthing.string = self.lbl_mapthing.string == "显示物件" ? "隐藏物件" : "显示物件";
        self.mapScrollComp.mapThingFactory.refSelfVsb();
    }

    /**重置缩放比例 */
    private _tap_btn_resetScale() {
        let self = this;
        self.mapScrollComp.resetScale();
        self.updateMapScale();
    }

    /** 测试运行 */
    private _tap_btn_runDemo() {
        let self = this;
        let mapData = self.mapMgr.getMapData();
        if (!mapData) {
            MessageTip.show({ msg: "地图数据为空" });
            return;
        }
        self.lbl_runDemo.string = self.lbl_runDemo.string == "测试运行" ? "关闭运行" : "测试运行";
        if (self.lbl_runDemo.string == "测试运行") {
            BaseUT.closeDlgByName(["JoyStickDlg"]);
            EntityMgr.inst.clear();
            BaseUT.changeMouseCursor("auto");
            return;
        }
        BaseUT.changeMouseCursor("url('/assets/resources/native/34/341c4534-3c0a-4dd7-adc1-1c235faf3c20.png'),auto");//使用自定义鼠标样式
        JoyStickDlg.show();
        console.log(`地图数据`);
        console.log(mapData);
        self._tap_btn_resetScale();
        PathFindingAgent.instance.init(mapData);
        EntityMgr.inst.init(self.mapScrollComp.grp_scrollMap, self.mapScrollComp.grp_entity);
    }
}


