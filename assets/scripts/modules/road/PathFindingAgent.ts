import { BaseUT } from "../../framework/base/BaseUtil";
import { CONST } from "../base/CONST";
import { G } from "../base/Interface";
import { MapMgr } from "../base/MapMgr";
import AstarHoneycombRoadSeeker from "./AstarHoneycombRoadSeeker";
import AStarRoadSeeker from "./AStarRoadSeeker";
import IRoadSeeker from "./IRoadSeeker";
import MapRoadUtils from "./MapRoadUtils";
import { PathOptimize } from "./PathOptimize";
import { PathQuadSeek } from "./PathQuadSeek";
import Point from "./Point";
import RoadNode from "./RoadNode";

/** 
 * @descripttion 寻路代理器
 * @author cyk
 * @date 2023-06-30 22:00:00
 */
export default class PathFindingAgent {

    private static _instance: PathFindingAgent;

    public static get inst(): PathFindingAgent {
        if (this._instance == null) {
            this._instance = new PathFindingAgent();
        }
        return this._instance;
    }

    private _roadDic: { [key: string]: RoadNode } = {};

    private _roadSeeker: IRoadSeeker;

    private _mapData: G.MapJsonInfo = null;
    private _mapType: CONST.MapType = CONST.MapType.angle45;
    public get mapType(): CONST.MapType {
        return this._mapType;
    }

    /** 当前地图数据*/
    public get mapData(): G.MapJsonInfo {
        return this._mapData;
    }

    /**
     *用于检索一个节点周围8个点的向量数组 (四边形格子用)
     */
    protected _round: number[][] = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];
    //private _round1:number[][] = [[0,-1],[1,0],[0,1],[-1,0]]; //只要4方向周围的路点，请使用这个

    /**
     *用于检索一个节点周围6个点的向量数组 格子列数为偶数时使用  (六边形格子用)
    */
    protected _round1: number[][] = [[0, -1], [1, -1], [1, 0], [0, 1], [-1, 0], [-1, -1]];

    /**
     *用于检索一个节点周围6个点的向量数组 格子列数为奇数时使用  (六边形格子用)
    */
    protected _round2: number[][] = [[0, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

    /**
     * 获得寻路接口
     */
    public get roadSeeker(): IRoadSeeker {
        return this._roadSeeker;
    }


    /**
     * 初始化寻路数据
     * @param roadDataArr 路电数据
     * @param mapType 地图类型
     */
    public init(mapData: G.MapJsonInfo) {
        this._mapData = mapData;
        this._mapType = mapData.type;

        MapRoadUtils.instance.updateMapInfo(this._mapData.mapWidth, this._mapData.mapHeight, this._mapData.cellSize, this._mapData.cellSize, this._mapData.type);

        let len: number = this._mapData.walkList.length;
        if (!len) return;
        let len2: number = this._mapData.walkList[0].length;

        let value: number = 0;
        let dx: number = 0;
        let dy: number = 0;
        let col: number = 0;
        let row: number = 0;

        for (let i: number = 0; i < len; i++) {
            for (let j: number = 0; j < len2; j++) {
                value = this._mapData.walkList[i][j];
                dx = j;
                dy = i;

                let node: RoadNode = MapRoadUtils.instance.getNodeByDerect(dx, dy);
                node.value = value;

                if (this._mapType == CONST.MapType.honeycomb2) {
                    col = node.col;
                    row = node.row;

                    //如果是横式六边形，则需要把路点世界坐标转置，即x,y调换。因为六边形寻路组件AstarHoneycombRoadSeeker是按纵式六边形写的
                    node.col = row;
                    node.row = col;
                }

                this._roadDic[node.col + "_" + node.row] = node;
            }
        }

        if (this._mapType == CONST.MapType.honeycomb || this._mapType == CONST.MapType.honeycomb2) {
            this._roadSeeker = new AstarHoneycombRoadSeeker(this._roadDic)
        }
        else {
            this._roadSeeker = new AStarRoadSeeker(this._roadDic);
        }
    }

    /**
     * 寻路方法，如果目标不可到达，不会返回任何路径。  备注：2d寻路，参数的单位是像素，3d寻路单位是米，2d和3d寻路是通用的
     * @param startX 起始像素位置X
     * @param startY 起始像素位置Y
     * @param targetX 目标像素位置X
     * @param targetY 目标像素位置Y
     * @returns 返回寻路路点路径
     */
    public seekPath(startX: number, startY: number, targetX: number, targetY: number, radius: number,): RoadNode[] {
        let startNode: RoadNode = this.getRoadNodeByPixel(startX, startY);
        let targetNode: RoadNode = this.getRoadNodeByPixel(targetX, targetY);
        let size = this.getSeekSize(radius);
        let roadNodeArr: RoadNode[] = this._roadSeeker.seekPath(startNode, targetNode, size);

        return roadNodeArr;
    }

    /**
     * 寻路方法，如果目标点不可达到，则返回离目标点最近的路径。  备注：2d寻路，参数的单位是像素，3d寻路单位是米，2d和3d寻路是通用的
     * @param startX 起始像素位置X
     * @param startY 起始像素位置Y
     * @param targetX 目标像素位置X
     * @param targetY 目标像素位置Y
     * @returns 返回寻路路点路径
     */
    public seekPath2(startX: number, startY: number, targetX: number, targetY: number, radius: number,): RoadNode[] {
        let startNode: RoadNode = this.getRoadNodeByPixel(startX, startY);
        let targetNode: RoadNode = this.getRoadNodeByPixel(targetX, targetY);
        let size = this.getSeekSize(radius);
        let roadNodeArr: RoadNode[] = this._roadSeeker.seekPath2(startNode, targetNode, size);

        return roadNodeArr;
    }

    /**
     * 测试寻路过程，测试用，如果遇到bug，可以通过这个函数监测寻路的每一个步骤的情况。能快速定位问题。
     * @param startX 起始像素位置X
     * @param startY 目标像素位置Y
     * @param targetX 目标像素位置X
     * @param targetY 目标像素位置Y
     * @param seekRoadCallback 寻路的每个步骤都会执行这个回调
     * @param target 回调函数的目标对象，用于给回调函数指定this是什么
     * @param time 测试寻路时，每个步骤之间的时间间隔，单位是毫秒，如果想慢点查看每个寻路步骤，可以把这个值设置大点
     */
    public testSeekRoad(startX: number, startY: number, targetX: number, targetY: number, radius: number, seekRoadCallback: Function, target: any, time) {
        let startNode: RoadNode = this.getRoadNodeByPixel(startX, startY);
        let targetNode: RoadNode = this.getRoadNodeByPixel(targetX, targetY);
        let size = this.getSeekSize(radius);
        this._roadSeeker.testSeekPathStep(startNode, targetNode, size, seekRoadCallback, target, time);
    }

    public getSeekSize(radius = 0) {
        let self = this;
        let mapData = self._mapData;
        let t = Math.min(mapData.cellSize/2, mapData.cellSize / 2);
        let a = Math.ceil((radius - t) / (2 * t));
        return a > 0 ? a : 0
    }

    /**
     * 两个路点之间是否可直达（即是否可以两点一线到达）
     * @param startNode 
     * @param targetNode 
     */
    public isArriveBetweenTwoNodes(startNode: RoadNode, targetNode: RoadNode): boolean {
        if (startNode == null || targetNode == null) {
            //两个点，只要有一个不在地图内，就是不可直达
            return false;
        }

        return this._roadSeeker.isArriveBetweenTwoNodes(startNode, targetNode);
    }

    /**
     * 在地图上，两个位置之间是否可直达。2d是像素位置，3d是米
     * @param x1 位置1 x轴
     * @param y1 位置1 y轴
     * @param x2 位置2 x轴
     * @param y2 位置2 y轴
     * @returns 
     */
    public isArriveBetweenTwoPos(x1: number, y1: number, x2: number, y2: number): boolean {
        let startNode: RoadNode = this.getRoadNodeByPixel(x1, y1);
        let targetNode: RoadNode = this.getRoadNodeByPixel(x2, y2);
        return this._roadSeeker.isArriveBetweenTwoNodes(startNode, targetNode);
    }

    /**
     * 根据像素坐标获得路节点
     * @param px 像素坐标x
     * @param py 像素坐标y
     * @returns 
     */
    public getRoadNodeByPixel(px: number, py: number): RoadNode {
        let point: Point = MapRoadUtils.instance.getWorldPointByPixel(px, py);

        let node: RoadNode = null;
        if (this._mapType == CONST.MapType.honeycomb2) //因为初始化时 横式六边形已经对世界坐标做过转置，所以读取路节点时也要通过转置的方式
        {
            node = this.getRoadNode(point.y, point.x);
        } else {
            node = this.getRoadNode(point.x, point.y);
        }

        return node;
    }

    /**
     * 根据世界坐标获得路节点
     * @param col 
     * @param row 
     */
    public getRoadNode(col: number, row: number): RoadNode {
        //return this._roadDic[col + "_" + row];
        return this._roadSeeker.getRoadNode(col, row);
    }

    /**
     * 获得一个路点周围相邻的所有路点
     * @param roadNode 选定的路点
     * @param isIncludeSelf 是否包含选定的路点
     * @returns 
     */
    public getRoundRoadNodes(roadNode: RoadNode, isIncludeSelf: boolean = false): RoadNode[] {
        if (roadNode == null) {
            return [];
        }

        let nodeArr: RoadNode[] = [];
        let round: number[][];

        if (isIncludeSelf) {
            nodeArr.push(roadNode);
        }

        if (this.mapType == CONST.MapType.honeycomb || this.mapType == CONST.MapType.honeycomb2) {
            roadNode.col % 2 == 0 ? round = this._round1 : round = this._round2;
        } else {
            round = this._round;
        }

        for (let i: number = 0; i < this._round.length; i++) {
            let col: number = roadNode.col + this._round[i][0];
            let row: number = roadNode.row + this._round[i][1];

            nodeArr.push(this.getRoadNode(col, row));
        }

        return nodeArr;
    }

    /**
     * 设置最大寻路步骤，超过这个寻路步骤还寻不到终点，就默认无法达到终点。
     * 设置这个限制的目的是，防止地图太大，路点太多，没有限制的话，寻路消耗会很大，甚至会卡死
     * @param maxStep 
     */
    public setMaxSeekStep(maxStep: number) {
        this._roadSeeker.setMaxSeekStep(maxStep);
    }

    /**
     * 设置路径优化等级，具体优化内容请查看脚本PathOptimize，里面有对各种优化等级的详细解释
     * @param optimize 
     */
    public setPathOptimize(optimize: PathOptimize) {
        this._roadSeeker.setPathOptimize(optimize);
    }

    /**
     * 设置4方向路点地图的寻路类型，只针对45度和90度地图，不包括六边形地图（六边形地图设置这个值无任何反应）
     * @param pathQuadSeek  4方向路点地图的寻路类型
     */
    public setPathQuadSeek(pathQuadSeek: PathQuadSeek) {
        this._roadSeeker.setPathQuadSeek(pathQuadSeek);
    }

    /**
     * 自定义路点是否能通过的条件，
     * @param callback 回调方法用于自定义路点是否可通过的条件，如果参数是null，则用默认判断条件，不是null，则取代默认判断条件
     */
    public setRoadNodePassCondition(callback: Function) {
        this._roadSeeker.setRoadNodePassCondition(callback);
    }

    /**随机获取一个起始点 */
    public getRandomStartPos(): { x: number, y: number } {
        let self = this;
        let mapData = self._mapData;
        let startList = mapData.startList;
        if (!startList || !startList.length) {
            return { x: 0, y: 0 };
        }
        let randomIdx = BaseUT.getRandomNumber(0, startList.length - 1);
        let pos = MapMgr.inst.idx2Pos(startList[randomIdx]);
        pos.x += MapMgr.inst.cellSize / 2;
        return pos;
    }

    /**
     * 是否可移动到指定坐标
     * @param x 
     * @param y 
     * @param isGrid 是否为格子行列
     * @returns 
     */
     
    public isCanMoveTo(x: number, y: number, isGrid?: boolean) {
        let self = this;
        let grid = isGrid ? { col: x, row: y } : MapMgr.inst.pos2Grid(x, y);
        let node: RoadNode = self._roadDic[grid.col + "_" + grid.row];
        return node && node.value == 1;
    }
}
