import { _decorator, EventMouse, instantiate, Node, Prefab, Vec2 } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
import { MapMgr } from '../../base/MapMgr';
import { G } from '../../base/Interface';
import { CONST } from '../../base/CONST';
import { BaseUT } from '../../../framework/base/BaseUtil';
import { mapThingSelect } from '../comp/mapThingSelect';
const { ccclass, property } = _decorator;
/** 
 * @descripttion 场景物件工厂
 * @author cyk
 * @date 2023-07-10 22:56:00
 */
@ccclass('MapThingFactory')
export class MapThingFactory extends UIComp {
    @property({ type: Prefab })
    public mapThingPrefab: Prefab;
    @property({ type: Prefab })
    public mapThingSelectPrefab: Prefab;
    @property({ type: Node })
    public grp_mapThingBevel: Node;
    @property({ type: Node })
    public grp_mapThingSelect: Node;
    private mapMgr: MapMgr;
    /**物件层级排序列表（用于根据物件y来控制物件层级） */
    private _mapThingSortList: { y: number, node: Node }[];
    private _mapThingSelect: mapThingSelect;
    private _lastSelectMapThingComp: Node;
    private _tid: number;
    protected onEnter(): void {
        let self = this;
        self.mapMgr = MapMgr.inst;
        self.onEmitter(CONST.GEVT.DragMapThingDown, self.onDragMapThingDown);
        self.onEmitter(CONST.GEVT.ChangeGridType, self.onChangeGridType);
        self.onEmitter(CONST.GEVT.ChangeMapThingXY, self.onChangeMapThingXY);
        if (!self._mapThingSelect) {
            let prefab = instantiate(self.mapThingSelectPrefab);
            prefab.setParent(self.grp_mapThingSelect);
            self._mapThingSelect = prefab.getComponent(mapThingSelect);
        }
    }

    public init(data: any) {
        let self = this;
        self.node.destroyAllChildren();
        self._mapThingSortList = [];
        let mapData: G.MapJsonInfo = data.mapData;
        if (mapData.mapThingList) {
            mapData.mapThingList.forEach(mapThingData => {
                self.onDragMapThingDown({
                    url: self.mapMgr.mapThingUrlMap[mapThingData.thingName],
                    thingName: mapThingData.thingName,
                    x: mapThingData.x,
                    y: mapThingData.y,
                    anchorX: mapThingData.anchorX,
                    anchorY: mapThingData.anchorY,
                    taskId: mapThingData.taskId,
                    groupId: mapThingData.groupId,
                    type: mapThingData.type,
                });
            });
        }

        if (mapData.borderList) {
            mapData.borderList.forEach(mapThingData => {
                let groupIdList = mapThingData.groupIdList || [];
                let groupIdStr: string = "";
                for (let ii = 0; ii < groupIdList.length; ii++) {
                    groupIdStr += groupIdList[ii] + (ii == groupIdList.length - 1 ? "" : ",");
                }
                self.onDragMapThingDown({
                    url: self.mapMgr.mapThingUrlMap[self.mapMgr.bavelResStr],
                    thingName: self.mapMgr.bavelResStr,
                    x: mapThingData.x,
                    y: mapThingData.y,
                    anchorX: 0.5,
                    anchorY: 0.5,
                    groupIdStr: groupIdStr,
                    type: CONST.MapThingType.bevel,
                });
            })
        }
        self.sortMapThing();
        self._mapThingSelect.clear();
        self.mapMgr.curMapThingInfo = null;
        self.emit(CONST.GEVT.ClearCurMapThingInfo);
    }

    public refSelfVsb() {
        let self = this;
        self.grp_mapThingSelect.active = !self.grp_mapThingSelect.active;
        self.grp_mapThingBevel.active = !self.grp_mapThingBevel.active;
        self.node.active = !self.node.active;
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
        let isByDrag = data.isByDrag;//是否拖拽放下
        let mapThingX = data.x;//场景物件坐标X
        let mapThingY = data.y;//场景物件坐标Y
        let anchorX = data.anchorX == undefined ? 0.5 : data.anchorX;
        let anchorY = data.anchorY == undefined ? 0.5 : data.anchorY;
        let mapThingInfo = <G.MapThingInfo>{};
        let mapThingComp = self.mapMgr.getMapThingComp(self.mapThingPrefab, data.url, anchorX, anchorY, imgLoaded, self);
        let elementName = data.thingName;
        let isBelve = elementName.indexOf(self.mapMgr.bavelResStr) > -1;//是否为斜角顶点
        if(isBelve){
            if(isByDrag){
                let grid = self.mapMgr.pos2Grid(mapThingX, mapThingY);
                let cellSize = self.mapMgr.cellSize;
                let pointArr = [
                    [grid.col * cellSize, grid.row * cellSize],
                    [grid.col * cellSize + cellSize, grid.row * cellSize],
                    [grid.col * cellSize + cellSize, grid.row * cellSize + cellSize],
                    [grid.col * cellSize, grid.row * cellSize + cellSize],
                ];
                let minDist: number;//最小距离
                let distArr = [];
                distArr.push(Vec2.distance({ x: Math.floor(mapThingX), y: Math.floor(mapThingY) }, { x: pointArr[0][0], y: pointArr[0][1] }));
                distArr.push(Vec2.distance({ x: Math.floor(mapThingX), y: Math.floor(mapThingY) }, { x: pointArr[1][0], y: pointArr[1][1] }));
                distArr.push(Vec2.distance({ x: Math.floor(mapThingX), y: Math.floor(mapThingY) }, { x: pointArr[2][0], y: pointArr[2][1] }));
                distArr.push(Vec2.distance({ x: Math.floor(mapThingX), y: Math.floor(mapThingY) }, { x: pointArr[3][0], y: pointArr[3][1] }));
                for (let i = 0; i < distArr.length; i++) {
                    if (!minDist) minDist = distArr[i];
                    else if (distArr[i] < minDist) minDist = distArr[i];
                }
                let minIndex = distArr.indexOf(minDist);
                mapThingX = pointArr[minIndex][0];
                mapThingY = pointArr[minIndex][1];
            }
            mapThingInfo.type = CONST.MapThingType.bevel;
        }else{
            mapThingInfo.type = data.type || CONST.MapThingType.task;
            self._mapThingSortList.push({ y: mapThingY, node: mapThingComp });
        }
        mapThingComp.setPosition(mapThingX, mapThingY);
        BaseUT.setPivot(mapThingComp, anchorX, anchorY);
        mapThingComp.setParent(isBelve ? self.grp_mapThingBevel : self.node);
        mapThingComp.name = Math.floor(mapThingX) + "_" + Math.floor(mapThingY);
        mapThingInfo.thingName = elementName;
        mapThingInfo.anchorX = anchorX;
        mapThingInfo.anchorY = anchorY;
        mapThingInfo.x = mapThingX;
        mapThingInfo.y = mapThingY;
        if (data.taskId) mapThingInfo.taskId = data.taskId;
        if (data.groupId) mapThingInfo.groupId = data.groupId;
        if (data.groupIdStr) mapThingInfo.groupIdStr = data.groupIdStr;
        if (self.mapMgr.mapThingMap[mapThingComp.name]) {
            self.mapMgr.mapThingMap[mapThingComp.name][1].destroy();
        }
        self.mapMgr.mapThingMap[mapThingComp.name] = [mapThingInfo, mapThingComp];
        if (isByDrag) {
            self._lastSelectMapThingComp = mapThingComp;
            self.mapMgr.curMapThingInfo = mapThingInfo;
            self.sortMapThing();
        }
        function imgLoaded(width: number, height: number) {
            mapThingInfo.width = width;
            mapThingInfo.height = height;
            if (isByDrag) {
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
        let mapThingInfo: G.MapThingInfo = mapMgr.mapThingMap[btn.name][0];
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
            let isBelve = mapThingInfo.thingName.indexOf(self.mapMgr.bavelResStr) > -1;//是否为斜角顶点
            if (!isBelve) self.removeItemFromMapThingSortList(mapThingInfo.y);
            mapMgr.rmMapThingGrid(Math.floor(mapThingInfo.x) + "_" + Math.floor(mapThingInfo.y));
            mapMgr.curMapThingInfo = null;
            delete mapMgr.mapThingMap[btn.name];
            self.emit(CONST.GEVT.ClearCurMapThingInfo);
            console.log('右键点击场景物件');
        }
    }

    /**排序场景物件层级 */
    private sortMapThing() {
        let self = this;
        let list = self._mapThingSortList;
        if (!list || !list.length) return;
        list.sort((a: { y: number }, b: { y: number }) => {
            if (a.y < b.y) return 1;
            else return -1;
        });
        for (let i = 0; i < list.length; i++) {
            list[i].node.removeFromParent();
            self.node.addChild(list[i].node);
        }
    }

    private removeItemFromMapThingSortList(y: number) {
        let self = this;
        let list = self._mapThingSortList;
        if (!list || !list.length) return;
        for (let i = list.length - 1; i >= 0; i--) {
            if (list[i].y == y) {
                self._mapThingSortList.splice(i, 1);
                break;
            }
        }
    }
}


