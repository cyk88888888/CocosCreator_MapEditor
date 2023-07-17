import { _decorator, EventMouse, instantiate, Node, Prefab, UITransform, Vec3 } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
import { MapMgr } from '../../base/MapMgr';
import { G } from '../../base/Interface';
import { CONST } from '../../base/CONST';
import { BaseUT } from '../../../framework/base/BaseUtil';
import { mapThingSelect } from '../comp/mapThingSelect';
const { ccclass, property } = _decorator;

/*
 * @Descripttion: 场景物件工厂
 * @Author: CYK
 * @Date: 2023-07-10 22:56:00
 */
@ccclass('MapThingFactory')
export class MapThingFactory extends UIComp {
    @property({ type: Prefab })
    public mapThingPrefab: Prefab;
    @property({ type: Prefab })
    public mapThingSelectPrefab: Prefab;
    @property({ type: Node })
    public grp_mapThingSelect: Node;
    private mapMgr: MapMgr;
    private _scrollMapUITranstorm: UITransform;
    private _mapThingSelect: mapThingSelect;
    private _lastSelectMapThingComp: Node;
    private _tid: number;
    protected onEnter(): void {
        let self = this;
        self.mapMgr = MapMgr.inst;
        self.onEmitter(CONST.GEVT.DragMapThingDown, self.onDragMapThingDown);
        self.onEmitter(CONST.GEVT.ChangeGridType, self.onChangeGridType);
        self.onEmitter(CONST.GEVT.ChangeMapThingXY, self.onChangeMapThingXY);
        let prefab = instantiate(self.mapThingSelectPrefab);
        prefab.setParent(self.grp_mapThingSelect);
        self._mapThingSelect = prefab.getComponent(mapThingSelect);
    }

    public init(data: any) {
        let self = this;
        let mapData: G.MapJsonInfo = data.mapData;
        self._scrollMapUITranstorm = data.scrollMapUITranstorm;

    }

    private onChangeGridType(dt: any) {
        let self = this;
        if (dt.gridType == CONST.GridType.GridType_mapThing) {
            self.mapMgr.isForbidDrawGrid = !self._mapThingSelect.isShow;
        } else {
            self._mapThingSelect.clear();
            self.mapMgr.curMapThingInfo = null;
            self.emit(CONST.GEVT.ClearCurMapThingInfo);
        }
    }

    private onChangeMapThingXY(dt: any) {
        let self = this;
        if (self._mapThingSelect.isShow) {
            self._mapThingSelect.drawRect(dt.x - dt.width / 2, dt.y - dt.height / 2, dt.width, dt.height);
        }
    }

    private onDragMapThingDown(data: G.DragMapthingInfo) {
        let self = this;
        let mousePos = BaseUT.getMousePos(data.location);//这里不直接取evt.getLocation()，再封装一层是因为舞台缩放，会影响evt.getLocation()的坐标） 
        let localUIPos = self._scrollMapUITranstorm.convertToNodeSpaceAR(new Vec3(mousePos.x, mousePos.y, 0));
        let isImportJson: boolean = data.isImportJson;//是否为导入json进来
        let mapThingX: number = isImportJson ? data.x : localUIPos.x;//场景物件坐标X
        let mapThingY: number = isImportJson ? data.y : localUIPos.y;//场景物件坐标Y
        let anchorX: number = data.anchorX == undefined ? 0.5 : data.anchorX;
        let anchorY: number = data.anchorY == undefined ? 0.5 : data.anchorY;
        let mapThingInfo = <G.MapThingInfo>{};
        let mapThingComp = self.mapMgr.getMapThingComp(self.mapThingPrefab, data.url, anchorX, anchorY, imgLoaded, self);
        let elementName: string = data.thingName;
        let isBelve: boolean = elementName.indexOf(self.mapMgr.bavelResStr) > -1;//是否为斜角顶点
        mapThingComp.setPosition(mapThingX, mapThingY);
        mapThingComp.setParent(self.node);
        mapThingComp.name = Math.floor(mapThingX) + "_" + Math.floor(mapThingY);
        mapThingInfo.thingName = elementName;
        mapThingInfo.anchorX = anchorX;
        mapThingInfo.anchorY = anchorY;
        mapThingInfo.x = mapThingX;
        mapThingInfo.y = mapThingY;
        if (data.taskId) mapThingInfo.taskId = data.taskId;
        if (data.groupId) mapThingInfo.groupId = data.groupId;
        if (data.groupIdStr) mapThingInfo.groupIdStr = data.groupIdStr;
        if (data.type) mapThingInfo.type = data.type;
        if (data.isByDrag) {
            if (isBelve) mapThingInfo.type = CONST.MapThingType.bevel;
        }
        self.mapMgr.mapThingMap[mapThingComp.name] = [mapThingInfo, mapThingComp];
        if (!isImportJson) {
            self._lastSelectMapThingComp = mapThingComp;
            self.mapMgr.curMapThingInfo = mapThingInfo;
        }
        function imgLoaded(width: number, height: number) {
            mapThingInfo.width = width;
            mapThingInfo.height = height;
            if (!isImportJson) {
                self.emit(CONST.GEVT.ClickMapTing);
                self._mapThingSelect.drawRect(mapThingX - width / 2, mapThingY - height / 2, width, height);
            }
        }

        mapThingComp.on(Node.EventType.MOUSE_DOWN, self.onMouseDown, self);
    }

    private onMouseDown(e: EventMouse) {
        let self = this;
        let mapMgr = self.mapMgr;
        let buttonId = e.getButton();
        let btn = e.currentTarget as Node;
        var mapThingInfo: G.MapThingInfo = mapMgr.mapThingMap[btn.name][0];
        if (buttonId == EventMouse.BUTTON_LEFT) {//左键选中场景物件
            console.log('左键点击场景物件');
            if (mapMgr.gridType != CONST.GridType.GridType_mapThing || mapMgr.isPressCtrl || mapMgr.isPressSpace) return;
            if (self._lastSelectMapThingComp != btn) {
                self._lastSelectMapThingComp = btn;
                mapMgr.isForbidDrawGrid = true;
            }
            self.clearTimeout(self._tid);
            self._tid = self.setTimeout(() => {//延迟0.1秒，这样做是为了在切换选中不同场景物件时，不会选中后就马上绘制触发区域格子
                mapMgr.isForbidDrawGrid = false;
            }, 200);
            self._mapThingSelect.drawRect(mapThingInfo.x - mapThingInfo.width / 2, mapThingInfo.y - mapThingInfo.height / 2, mapThingInfo.width, mapThingInfo.height);
            mapMgr.curMapThingInfo = mapThingInfo;
            self.emit(CONST.GEVT.ClickMapTing);
        } else if (buttonId == EventMouse.BUTTON_RIGHT) {
            if (mapMgr.gridType != CONST.GridType.GridType_mapThing || mapMgr.isPressSpace) return;
            if (mapMgr.isPressCtrl) {//删除场景物件

            } else {//重新拖拽场景物件
                self.emit(CONST.GEVT.DragMapThingStart, {
                    thingName: mapThingInfo.thingName,
                    url: mapMgr.mapThingUrlMap[mapThingInfo.thingName],
                    taskId: mapThingInfo.taskId,
                    groupId: mapThingInfo.groupId,
                    type: mapThingInfo.type,
                    groupIdStr: mapThingInfo.groupIdStr
                });
            }
            self._mapThingSelect.clear();
            btn.destroy();
            mapMgr.rmMapThingGrid(Math.floor(mapThingInfo.x) + "_" + Math.floor(mapThingInfo.y));
            mapMgr.curMapThingInfo = null;
            delete mapMgr.mapThingMap[btn.name];
            self.emit(CONST.GEVT.ClearCurMapThingInfo);
            console.log('右键点击场景物件');
        }
    }
}


