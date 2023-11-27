import { _decorator, instantiate, Prefab, Vec3 } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
import { MapMgr } from '../../base/MapMgr';
import { ColorGrid } from '../comp/ColorGrid';
import { CONST } from '../../base/CONST';
import { G } from '../../base/Interface';
const { ccclass, property } = _decorator;
/** 
 * @descripttion 网格绘制工厂
 * @author cyk
 * @date 2023-06-30 23:00:00
 */
@ccclass('MapGridFactory')
export class MapGridFactory extends UIComp {
    @property({ type: Prefab })
    public colorGridPrefab: Prefab;

    private mapMgr: MapMgr;
    /**区域格子Graphic缓存map */
    private _graphicsDic: { [areaKey: string]: ColorGrid };
    private _colorDic: { [gridType: string]: string };
    /**删除格子时涉及到的区域临时map */
    private _redrawTempMap: { [graphicKey: string]: string };
    protected onEnter(): void {
        let self = this;
        self.mapMgr = MapMgr.inst;
        self.onEmitter(CONST.GEVT.ReDarwGraphic, self.onReDarwGraphic);
    }

    public init(data: any) {
        let self = this;
        self._graphicsDic = {};
        self._colorDic = {};
        let mapData: G.MapJsonInfo = data.mapData;
        let walkList = mapData.walkList || [];
        /** 设置可行走节点**/
        for (let i = 0; i < walkList.length; i++) {//行
            let lineList = walkList[i];
            for (let j = 0; j < lineList.length; j++) {//列
                if (lineList[j] != 0) {
                    let gridType: string;
                    if (lineList[j] == 1) {//可行走
                        gridType = CONST.GridType.GridType_walk;
                    }
                    self.addGrid(gridType, { col: j, row: i });
                }
            }
        }

        addGridDataByType(CONST.GridType.GridType_start, mapData.startList || []);
        addGridDataByType(CONST.GridType.GridType_WaterVerts, mapData.waterVertList || []);

        if (mapData.mapThingList) {
            mapData.mapThingList.forEach(mapThingData=> {
                let tempMapThingInfo = <G.MapThingInfo>{};
                tempMapThingInfo.x = mapThingData.x;
                tempMapThingInfo.y = mapThingData.y;
                self.mapMgr.curMapThingInfo = tempMapThingInfo;//这里创建的临时mapthingInfo是为了导入地图数据时往gridDataDic里塞格子数据用
                if (mapThingData.area) addGridDataByType(CONST.GridType.GridType_mapThing + CONST.MapThingTriggerType.MapThingTrigger_light, mapThingData.area);
                if (mapThingData.unWalkArea) addGridDataByType(CONST.GridType.GridType_mapThing + CONST.MapThingTriggerType.MapThingTrigger_unWalk, mapThingData.unWalkArea);
                if (mapThingData.keyManStandArea) addGridDataByType(CONST.GridType.GridType_mapThing + CONST.MapThingTriggerType.MapThingTrigger_keyManStand, mapThingData.keyManStandArea);
                if (mapThingData.grassArea) addGridDataByType(CONST.GridType.GridType_mapThing + CONST.MapThingTriggerType.MapThingTrigger_grass, mapThingData.grassArea);
            });
        }

        function addGridDataByType(gridType: string, gridList: number[]) {
            for (let i = 0; i < gridList.length; i++) {
                let grid = self.mapMgr.idx2Grid(gridList[i]);
                self.addGrid(gridType, { col: grid.col, row: grid.row });
            }
        }
    }

    public onAddNodeHandler(localUIPos: Vec3) {
        let self = this;
        self.addOrRmRangeGrid(localUIPos, true);
    }

    public onRemoveNodeHandler(localUIPos: Vec3) {
        let self = this;
        self.addOrRmRangeGrid(localUIPos, false);
    }

    /**添加或者删除格子 */
    private addOrRmRangeGrid(localUIPos: Vec3, isAdd: boolean) {
        let self = this;
        let range = self.mapMgr.gridRange;
        let grid = self.mapMgr.pos2Grid(localUIPos.x, localUIPos.y);
        let gridType = self.mapMgr.gridType;
        self._redrawTempMap = {};
        if (range == 0) {
            if (isAdd) {
                self.addGrid(gridType, grid);
            } else {
                self.removeGrid(gridType, grid);
            }
        } else {
            let numCols = self.mapMgr.totCol;
            let numRows = self.mapMgr.totRow;
            let startCol = Math.max(0, grid.col - range);
            let endCol = Math.min(numCols - 1, grid.col + range);
            let startRow = Math.max(0, grid.row - range);
            let endRow = Math.min(numRows - 1, grid.row + range);
            for (let i = startCol; i <= endCol; i++) {
                for (let j = startRow; j <= endRow; j++) {
                    if (isAdd) {
                        self.addGrid(gridType, { col: i, row: j });
                    } else {
                        self.removeGrid(gridType, { col: i, row: j });
                    }
                }
            }
        }
        if (!isAdd) self.drawGraphic();//移除格子时，删除数据后，重新绘制感兴趣区域的所有格子
    }

    /**
     * 添加指定行列的格子
     * @param gridPos 格子行列
     * @returns 
     */
    private addGrid(gridType: string, gridPos: { col: number, row: number }) {
        let self = this;
        let mapMgr = self.mapMgr;
        let gridKey = gridPos.col + "_" + gridPos.row;
        let graphicsPos = { x: Math.floor(gridPos.col / mapMgr.areaGraphicSize), y: Math.floor(gridPos.row / mapMgr.areaGraphicSize) };
        let gridDataMap = mapMgr.gridDataMap;
        let areaKey = graphicsPos.x + '_' + graphicsPos.y;
        let colorType = gridType;
        if (gridType.indexOf(CONST.GridType.GridType_mapThing) > -1) {//场景物件格子有归属关系，这里特殊处理，方便物件删除时，把格子一起删除
            let mapThingInfo: G.MapThingInfo = mapMgr.curMapThingInfo;
            if (!mapThingInfo || mapThingInfo.type == CONST.MapThingType.bevel) return;//顶点格子不需要绘制颜色格子
            let mapThingKey: string = Math.floor(mapThingInfo.x) + "_" + Math.floor(mapThingInfo.y);
            colorType = gridType == CONST.GridType.GridType_mapThing ? gridType + mapMgr.curMapThingTriggerType : gridType;
            gridType = gridType == CONST.GridType.GridType_mapThing ? gridType + mapMgr.curMapThingTriggerType + "_" + mapThingKey : gridType + "_" + mapThingKey;
        }
        if (!gridDataMap[gridType]) gridDataMap[gridType] = {};
        if (!gridDataMap[gridType][areaKey]) gridDataMap[gridType][areaKey] = {};
        if (gridDataMap[gridType][areaKey][gridKey]) return; //已有格子
        gridDataMap[gridType][areaKey][gridKey] = gridKey;
        let color = self._colorDic[gridType] = mapMgr.getColorByType(colorType);
        let cellSize = mapMgr.cellSize;
        let graphicsKey = gridType + '_' + areaKey;
        let graphics = self.getGraphic(graphicsKey);
        graphics.drawRect(color, gridPos.col * cellSize, gridPos.row * cellSize, cellSize, cellSize);
    }

    /**
     * 清除指定行列的格子
     * @param gridPos 格子行列
     * @returns 
     */
    private removeGrid(gridType: string, gridPos: { col: number, row: number }) {
        let self = this;
        let mapMgr = self.mapMgr;
        let gridKey = gridPos.col + "_" + gridPos.row;
        if (gridType.indexOf(CONST.GridType.GridType_mapThing) > -1) {//场景物件格子有归属关系，这里特殊处理，方便物件删除时，把格子一起删除
            let mapThingInfo: G.MapThingInfo = mapMgr.curMapThingInfo;
            if (!mapThingInfo) return;
            let mapThingKey: string = Math.floor(mapThingInfo.x) + "_" + Math.floor(mapThingInfo.y);
            gridType = gridType + mapMgr.curMapThingTriggerType + "_" + mapThingKey;
        }
        let gridDataMap = mapMgr.gridDataMap;
        let graphicsPos = { x: Math.floor(gridPos.col / mapMgr.areaGraphicSize), y: Math.floor(gridPos.row / mapMgr.areaGraphicSize) };
        let areaKey = graphicsPos.x + '_' + graphicsPos.y;

        if (gridDataMap[gridType] && gridDataMap[gridType][areaKey] && gridDataMap[gridType][areaKey][gridKey]) {
            delete gridDataMap[gridType][areaKey][gridKey];
            self._redrawTempMap[gridType + '|' + areaKey] = gridType + '_' + areaKey;
        }
    }

    private onReDarwGraphic(dt: any) {
        let self = this;
        self._redrawTempMap = dt.redrawDic;
        self.drawGraphic();
    }

    /**移除格子删除数据后，重新绘制感兴趣区域的所有格子 */
    private drawGraphic() {
        let self = this;
        let gridDataMap = self.mapMgr.gridDataMap;
        let cellSize = self.mapMgr.cellSize;
        for (let key in self._redrawTempMap) {
            let splitKey = key.split('|');
            let gridType = splitKey[0];
            let areaKey = splitKey[1];
            let graphicsKey = self._redrawTempMap[key];
            let graphics = self.getGraphic(graphicsKey);
            graphics.clear();
            let color = self._colorDic[gridType];
            let areaGridDataMap = gridDataMap[gridType][areaKey];
            if (areaGridDataMap) {
                for (let gridKey in areaGridDataMap) {
                    let spltGridPosKey = gridKey.split("_");
                    graphics.drawRect(color, Number(spltGridPosKey[0]) * cellSize, Number(spltGridPosKey[1]) * cellSize, cellSize, cellSize);
                }
            }
        }
    }

    private getGraphic(key: string): ColorGrid {
        let self = this;
        if (!self._graphicsDic[key]) {
            let colorGrid = instantiate(self.colorGridPrefab);
            colorGrid.setParent(self.node);
            let graphics = colorGrid.getComponent(ColorGrid);
            self._graphicsDic[key] = graphics;
        }
        return self._graphicsDic[key];
    }
}


