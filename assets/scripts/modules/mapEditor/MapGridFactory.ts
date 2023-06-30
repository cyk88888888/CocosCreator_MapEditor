import { _decorator, Component, EventMouse, instantiate, Node, Prefab, UI, UITransform, Vec2, Vec3 } from 'cc';
import { UIComp } from '../../framework/ui/UIComp';
import { MapMgr } from '../base/MapMgr';
import { ColorGrid } from './grid/ColorGrid';
import { BaseUT } from '../../framework/base/BaseUtil';
const { ccclass, property } = _decorator;
/*
 * @Descripttion: 网格绘制工厂
 * @Author: CYK
 * @Date: 2023-06-30 23:00:00
 */
@ccclass('MapGridFactory')
export class MapGridFactory extends UIComp {
    @property({ type: Prefab })
    public colorGrid: Prefab;

    private mapMgr: MapMgr;
    private _scrollMapUITranstorm: UITransform;
    protected onEnter(): void {
        let self = this;
        self.mapMgr = MapMgr.inst;
        self._scrollMapUITranstorm = self.node.parent.getComponent(UITransform);
    }

    public onAddNodeHandler(e: EventMouse) {
        let self = this;
        self.addOrRmRangeGrid(e.getLocation(), true);
    }

    public onRemoveNodeHandler(e: EventMouse) {
        let self = this;
        self.addOrRmRangeGrid(e.getLocation(), false);
    }

    /**添加或者删除格子 */
    private addOrRmRangeGrid(location: Vec2, isAdd: boolean) {
        let self = this;
        let range = self.mapMgr.gridRange;
        let mousePos = BaseUT.getMousePos(location);//这里不直接取evt.getLocation()，再封装一层是因为舞台缩放，会影响evt.getLocation()的坐标） 
        let localUIPos = self._scrollMapUITranstorm.convertToNodeSpaceAR(new Vec3(mousePos.x, mousePos.y, 0));
        let gridPos = self.mapMgr.pos2Grid(localUIPos.x, localUIPos.y);
        if (range == 0) {
            if (isAdd) {
                self.addGrid(gridPos);
            } else {
                self.removeGrid(gridPos);
            }
        } else {
            let numCols = self.mapMgr.numCols;
            let numRows = self.mapMgr.numRows;
            let startCol = Math.max(0, gridPos.x - range);
            let endCol = Math.min(numCols - 1, gridPos.x + range);
            let startRow = Math.max(0, gridPos.y - range);
            let endRow = Math.min(numRows - 1, gridPos.y + range);
            for (let i = startCol; i <= endCol; i++) {
                for (let j = startRow; j <= endRow; j++) {
                    if (isAdd) {
                        self.addGrid({ x: i, y: j });
                    } else {
                        self.removeGrid({ x: i, y: j });
                    }
                }
            }
        }
    }

    /**
     * 填充格子
     * @param gridPos 格子行列
     * @returns 
     */
    private addGrid(gridPos: { x: number, y: number }) {
        let self = this;
        let mapMgr = self.mapMgr;
        let gridType = self.mapMgr.gridType;
        if (!mapMgr.gridTypeMap[gridType]) {
            mapMgr.gridTypeMap[gridType] = {};
        }
        let cellSize = mapMgr.cellSize;
        let key = gridPos.x + "_" + gridPos.y;
        if (mapMgr.gridTypeMap[gridType][key]) return;//已有格子
        let colorGrid = instantiate(self.colorGrid);
        let colorGridScript = colorGrid.getComponent(ColorGrid);
        colorGrid.setParent(self.node);
        colorGridScript.drawRect(self.mapMgr.getColorByType(gridType), gridPos.x * cellSize, gridPos.y * cellSize, mapMgr.cellSize);
        mapMgr.gridTypeMap[gridType][key] = colorGrid;
    }

    /**
     * 清除格子
     * @param gridPos 格子行列
     * @returns 
     */
    private removeGrid(gridPos: { x: number, y: number }) {
        let self = this;
        let mapMgr = self.mapMgr;
        let gridType = self.mapMgr.gridType;
        if (!mapMgr.gridTypeMap[gridType]) return;
        let key = gridPos.x + "_" + gridPos.y;
        let colorGrid: Node = mapMgr.gridTypeMap[gridType][key];
        if (!colorGrid) return;
        delete mapMgr.gridTypeMap[gridType][key];
        colorGrid.destroy();
    }

}


