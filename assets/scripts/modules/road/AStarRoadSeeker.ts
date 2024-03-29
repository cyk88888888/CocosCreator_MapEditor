import RoadNode from "./RoadNode";
import IRoadSeeker from "./IRoadSeeker";
import BinaryTreeNode from "./BinaryTreeNode";
import { PathOptimize } from "./PathOptimize";
import { PathQuadSeek } from "./PathQuadSeek";

/** 
 * @descripttion A*寻路算法（45度等视角地图 || 90度平面地图）
 * @author cyk
 * @date 2023-06-30 22:00:00
 */
export default class AStarRoadSeeker implements IRoadSeeker {

    /**
     * 横向移动一个格子的代价
     */
    private COST_STRAIGHT: number = 10;

    /**
     * 斜向移动一个格子的代价
     */
    private COST_DIAGONAL: number = 14;

    /**
     *最大搜寻步骤数，超过这个值时表示找不到目标 
     */
    private maxStep: number = 100000;

    /**
     * 开启列表
     */
    private _openlist: Array<RoadNode>;

    /**
     *关闭列表 
     */
    private _closelist: Array<RoadNode>;

    /**
     * 二叉堆存储结构
     */
    private _binaryTreeNode: BinaryTreeNode = new BinaryTreeNode();

    /**
     *开始节点 
     */
    private _startNode: RoadNode;

    /**
     *当前检索节点 
     */
    private _currentNode: RoadNode;

    /**
     *目标节点 
     */
    private _targetNode: RoadNode;

    /**
     *地图路点数据 
     */
    private _roadNodes: { [key: number]: RoadNode };

    /**
     * 用于检索一个节点周围上下左右4个点的向量数组 
     */
    private _round1: number[][] = [[0, -1], [1, 0], [0, 1], [-1, 0]]

    /**
     * 用于检索一个节点周围8个点的向量数组 
     */
    private _round2: number[][] = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]]

    /**
     *用于检索一个节点周围n个点的向量数组，默认8方向
    */
    private _round: number[][] = this._round2;

    /** 寻路角色体积周围一圈的偏移值*/
    private _neighbours: number[][];

     /** 寻路角色体积周围一圈的偏移值map缓存*/
    private _neighboursDic:{[size: number]: number[][]} = {};

    private handle: number = -1;

    /**
     * 是否优化路径
     */
    private optimize: boolean = true;

    /**
     * 优化类型，默认使用最短路径的优化
     */
    private _pathOptimize: PathOptimize = PathOptimize.none;

    /**
     * 默认使用8方向寻路
     */
    private _pathQuadSeek: PathQuadSeek = PathQuadSeek.path_dire_8;

    /**
     * 定义一个路点是否能通过，如果是null，则用默认判断条件
     */
    private _isPassCallBack: Function = null;
    /** 计算本次寻路的开始时间*/
    private _startCalculateTime: number;

    public constructor(roadNodes: { [key: string]: RoadNode }) {
        this._roadNodes = roadNodes;
    }

    /**
     * 设置最大寻路步骤
     * @param maxStep 
     */
    public setMaxSeekStep(maxStep: number) {
        this.maxStep = maxStep;
    }

    /**
     * 设置路径优化等级
     * @param optimize 
     */
    public setPathOptimize(optimize: PathOptimize) {
        this._pathOptimize = optimize;
    }

    /**
     * 设置4方向路点的寻路类型
     * @param pathQuadSeek 
     */
    public setPathQuadSeek(pathQuadSeek: PathQuadSeek) {
        this._pathQuadSeek = pathQuadSeek;

        if (this._pathQuadSeek == PathQuadSeek.path_dire_4) {
            this._round = this._round1; //如果是4方向寻路，则只需初始化4方向的寻路向量数组
        } else {
            this._round = this._round2; //如果是8方向寻路，则只需初始化8方向的寻路向量数组
        }
    }

    /**
     * 定义一个路点是否能通过，如果参数是null，则用默认判断条件
     * @param callback 
     */
    public setRoadNodePassCondition(callback: Function) {
        this._isPassCallBack = callback;
    }

    /**
     * 寻路入口方法
     * @param startNode 
     * @param targetNode 
     * @param size 寻路半径
     * @returns 
     */
    public seekPath(startNode: RoadNode, targetNode: RoadNode, size?:number): Array<RoadNode> {
        this._startNode = startNode;
        this._currentNode = startNode;
        this._targetNode = targetNode;
        this._neighbours = this.getNeighbours(size),
        this._startCalculateTime = this.getTime();
        if (!this._startNode || !this._targetNode)
            return [];

        if (this._startNode == this._targetNode) {
            return [this._targetNode];
        }

        if (!this.isCanPass(this._targetNode)) {
            console.warn(`目标不可达到, 行: ${this._targetNode.row}, 列: ${this._targetNode.col}, x: ${this._targetNode.px}, y: ${this._targetNode.py}`);
            return [];
        }

        this._startNode.g = 0; //重置起始节点的g值
        this._startNode.resetTree(); //清除起始节点原有的二叉堆关联关系

        this._binaryTreeNode.refleshTag(); //刷新二叉堆tag，用于后面判断是不是属于当前次的寻路
        //this._binaryTreeNode.addTreeNode(this._startNode); //把起始节点设置为二叉堆结构的根节点

        let step: number = 0;

        while (true) {
            if (step > this.maxStep) {
                let totTime = this.getTime() - this._startCalculateTime;
                console.warn(`超过最大寻路步数{${this.maxStep}}, 没找到目标计算步骤为：${step}, 总耗时: ${totTime}ms` );
                return [];
            }

            step++;

            this.searchRoundNodes(this._currentNode);

            if (this._binaryTreeNode.isTreeNull()) //二叉堆树里已经没有任何可搜寻的点了，则寻路结束，每找到目标
            {
                let totTime = this.getTime() - this._startCalculateTime;
                console.warn(`没找到目标计算步骤为：: ${step}，总耗时: ${totTime}ms`, );
                return [];
            }

            this._currentNode = this._binaryTreeNode.getMin_F_Node();

            if (this._currentNode == this._targetNode) {
                let totTime = this.getTime() - this._startCalculateTime;
                console.log(`找到目标计算步骤为: ${step}，总耗时: ${totTime}ms`, );
                return this.getPath();
            } else {
                this._binaryTreeNode.setRoadNodeInCloseList(this._currentNode);//打入关闭列表标记
            }

        }
    }

   /**
    * 寻路入口方法 如果没有寻到目标，则返回离目标最近的路径
    * @param startNode 
    * @param targetNode 
    * @param size 寻路半径
    * @returns 
    */
    public seekPath2(startNode: RoadNode, targetNode: RoadNode, size?:number): Array<RoadNode> {
        this._startNode = startNode;
        this._currentNode = startNode;
        this._targetNode = targetNode;
        this._neighbours = this.getNeighbours(size),
        this._startCalculateTime = this.getTime();
        if (!this._startNode || !this._targetNode)
            return [];

        if (this._startNode == this._targetNode) {
            return [this._targetNode];
        }

        let newMaxStep: number = this.maxStep;

        if (!this.isCanPass(this._targetNode)) {
            //如果不能直达目标，最大寻路步骤 = 为两点间的预估距离的3倍
            newMaxStep = (Math.abs(this._targetNode.col - this._startNode.col) + Math.abs(this._targetNode.row - this._startNode.row)) * 3;
            if (newMaxStep > this.maxStep) {
                newMaxStep = this.maxStep;
            }
        }

        this._startNode.g = 0; //重置起始节点的g值
        this._startNode.resetTree(); //清除起始节点原有的二叉堆关联关系

        this._binaryTreeNode.refleshTag(); //刷新二叉堆tag，用于后面判断是不是属于当前次的寻路
        //this._binaryTreeNode.addTreeNode(this._startNode); //把起始节点设置为二叉堆结构的根节点

        let step: number = 0;

        let closestNode: RoadNode = null; //距离目标最近的路点

        while (true) {
            if (step > newMaxStep) {
                let totTime = this.getTime() - this._startCalculateTime;
                console.warn(`seekPath2 超过最大寻路步数{${this.maxStep}}, 没找到目标计算步骤为：${step}, 总耗时: ${totTime}ms` );
                return this.seekPath(startNode, closestNode);
            }

            step++;

            this.searchRoundNodes(this._currentNode);

            if (this._binaryTreeNode.isTreeNull()) //二叉堆树里已经没有任何可搜寻的点了，则寻路结束，没找到目标
            {
                let totTime = this.getTime() - this._startCalculateTime;
                console.warn(`seekPath2 没找到目标计算步骤为：${step}, 总耗时: ${totTime}ms` );
                return this.seekPath(startNode, closestNode);
            }

            this._currentNode = this._binaryTreeNode.getMin_F_Node();


            if (closestNode == null) {
                closestNode = this._currentNode;
            } else {
                if (this._currentNode.h < closestNode.h) {
                    closestNode = this._currentNode;
                }
            }

            if (this._currentNode == this._targetNode) {
                let totTime = this.getTime() - this._startCalculateTime;
                console.log(`seekPath2 找到目标计算步骤为：${step}, 总耗时: ${totTime}ms` );
                return this.getPath();
            } else {
                this._binaryTreeNode.setRoadNodeInCloseList(this._currentNode);//打入关闭列表标记
            }

        }

    }

    /**
     *获得最终寻路到的所有路点 
     * @return 
     */
    private getPath(): Array<RoadNode> {
        let nodeArr: Array<RoadNode> = [];

        let node: RoadNode = this._targetNode;

        while (node != this._startNode) {
            nodeArr.unshift(node);
            node = node.parent;
        }

        nodeArr.unshift(this._startNode);

        //如果不优化，则直接返回完整寻路路径
        if (this._pathOptimize == PathOptimize.none) {
            return nodeArr;
        }

        //第一阶段优化： 对横，竖，正斜进行优化
        //把多个节点连在一起的，横向或者斜向的一连串点，除两边的点保留
        for (let i: number = 1; i < nodeArr.length - 1; i++) {
            let preNode: RoadNode = nodeArr[i - 1] as RoadNode;
            let midNode: RoadNode = nodeArr[i] as RoadNode;
            let nextNode: RoadNode = nodeArr[i + 1] as RoadNode;

            let bool1: Boolean = midNode.col == preNode.col && midNode.col == nextNode.col;
            let bool2: Boolean = midNode.row == preNode.row && midNode.row == nextNode.row;
            let bool3: Boolean = false;

            if (this._pathQuadSeek == PathQuadSeek.path_dire_8) //寻路类型是8方向时才考虑正斜角路径优化
            {
                bool3 = ((midNode.col - preNode.col) / (midNode.row - preNode.row)) * ((nextNode.col - midNode.col) / (nextNode.row - midNode.row)) == 1
            }

            if (bool1 || bool2 || bool3) {
                nodeArr.splice(i, 1)
                i--;
            }
        }

        //如果寻路类型是4方向寻路，则直接返回第一阶段的优化结果。
        //（因为4方向寻路是用不到第二阶段优化的，否则进入第二阶段优化的话，路径就不按上下左右相连了，这并不是4方寻路想要的结果）
        if (this._pathQuadSeek == PathQuadSeek.path_dire_4) {
            return nodeArr;
        }

        //如果只需要优化到第一阶段，则直接返回第一阶段的优化结果
        if (this._pathOptimize == PathOptimize.better) {
            return nodeArr;
        }

        //第二阶段优化：对不在横，竖，正斜的格子进行优化
        for (let i: number = 0; i < nodeArr.length - 2; i++) {
            let startNode: RoadNode = nodeArr[i] as RoadNode;
            let optimizeNode: RoadNode = null;

            //优先从尾部对比，如果能直达就把中间多余的路点删掉
            for (var j: number = nodeArr.length - 1; j > i + 1; j--) {
                let targetNode: RoadNode = nodeArr[j] as RoadNode;

                //在第一阶段优已经优化过横，竖，正斜了，所以再出现是肯定不能优化的，可以忽略
                if (startNode.col == targetNode.col || startNode.row == targetNode.row || Math.abs(targetNode.col - startNode.col) == Math.abs(targetNode.row - startNode.row)) {
                    continue;
                }

                if (this.isArriveBetweenTwoNodes(startNode, targetNode)) {
                    optimizeNode = targetNode;
                    break;
                }

            }

            if (optimizeNode) {
                let optimizeLen: number = j - i - 1;
                nodeArr.splice(i + 1, optimizeLen);
            }

        }

        return nodeArr;
    }

    /**
     * 两点之间是否可到达
     */
    public isArriveBetweenTwoNodes(startNode: RoadNode, targetNode: RoadNode): boolean {
        if (startNode == targetNode) {
            return false;
        }

        let disX: number = Math.abs(targetNode.col - startNode.col);
        let disY: number = Math.abs(targetNode.row - startNode.row);

        let dirX = 0;

        if (targetNode.col > startNode.col) {
            dirX = 1;
        } else if (targetNode.col < startNode.col) {
            dirX = -1;
        }

        let dirY = 0;

        if (targetNode.row > startNode.row) {
            dirY = 1;
        } else if (targetNode.row < startNode.row) {
            dirY = -1;
        }

        let rx: number = 0;
        let ry: number = 0;
        let intNum: number = 0;
        let decimal: number = 0;
        let rate: number;
        if (disX > disY) {
            rate = disY / disX;

            for (let i = 0; i < disX; i++) {
                ry = startNode.row + i * dirY * rate;
                intNum = Math.floor(ry);
                decimal = ry % 1;

                let col1: number = startNode.col + i * dirX;
                let row1: number = decimal <= 0.5 ? intNum : intNum + 1;

                ry = startNode.row + (i + 1) * dirY * rate;
                intNum = Math.floor(ry);
                decimal = ry % 1;

                let col2: number = startNode.col + (i + 1) * dirX;
                let row2: number = decimal <= 0.5 ? intNum : intNum + 1;

                let node1: RoadNode = this.getRoadNode(col1, row1);
                let node2: RoadNode = this.getRoadNode(col2, row2);

                //cc.log(i + "  :: " + node1.row," yy ",startNode.row + i * rate,ry % 1);

                if (!this.isCrossAtAdjacentNodes(node1, node2)) {
                    return false;
                }
            }

        } else {
            rate = disX / disY;

            for (let i = 0; i < disY; i++) {
                rx = i * dirX * rate;
                intNum = dirX > 0 ? Math.floor(startNode.col + rx) : Math.ceil(startNode.col + rx);
                decimal = Math.abs(rx % 1);

                let col1: number = decimal <= 0.5 ? intNum : intNum + 1 * dirX;
                let row1: number = startNode.row + i * dirY;

                rx = (i + 1) * dirX * rate;
                intNum = dirX > 0 ? Math.floor(startNode.col + rx) : Math.ceil(startNode.col + rx);
                decimal = Math.abs(rx % 1);

                let col2: number = decimal <= 0.5 ? intNum : intNum + 1 * dirX;
                let row2: number = startNode.row + (i + 1) * dirY;

                let node1: RoadNode = this.getRoadNode(col1, row1);
                let node2: RoadNode = this.getRoadNode(col2, row2);

                if (!this.isCrossAtAdjacentNodes(node1, node2)) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * 判断两个相邻的点是否可通过
     * @param node1 
     * @param node2 
     */
    private isCrossAtAdjacentNodes(node1: RoadNode, node2: RoadNode): boolean {
        if (node1 == node2) {
            return false;
        }

        //两个点只要有一个点不能通过就不能通过
        if (!this.isCanPass(node1) || !this.isCanPass(node2)) {
            return false;
        }

        let dirX = node2.col - node1.col;
        let dirY = node2.row - node1.row

        //如果不是相邻的两个点 则不能通过
        if (Math.abs(dirX) > 1 || Math.abs(dirY) > 1) {
            return false;
        }

        //如果相邻的点是在同一行，或者同一列，则判定为可通过
        if ((node1.col == node2.col) || (node1.row == node2.row)) {
            return true;
        }

        //只剩对角情况了
        if ( this.isPassNode(this.getRoadNode(node1.col, node1.row + dirY)) &&this.isPassNode(this.getRoadNode((node1.col + dirX), node1.row))) {
            return true;
        }

        return false;
    }

    /**
     * 是否是可通过的点 
     * @param node 
     */
    public isPassNode(node: RoadNode): boolean {
        if (this._isPassCallBack != null) {
            //如果设置有自定义条件，则使用自定义判断条件
            return this._isPassCallBack(node);
        }

        if (node == null || node.value == 0) {
            return false;
        }

        return true;
    }

    public isCanPass(node: RoadNode) {
        if (!this.isPassNode(node))
            return false;
        if (!this._neighbours || !this._neighbours.length)
            return true;
        for (let i = 0; i < this._neighbours.length; i++) {
            let col = node.col + this._neighbours[i][0], row = node.row + this._neighbours[i][1], n = this.getRoadNode(col, row);
            if (!this.isPassNode(n))
                return false;
        }
        return true;
    }

    /**
     * 根据世界坐标获得路节点
     * @param col 
     * @param row 
     * @returns 
     */
    public getRoadNode(col: number, row: number): RoadNode {
        let key: string = col + "_" + row;
        return this._roadNodes[key];
    }

    private getNeighbours(size:number) {
        if (!size)
            return null;
        let e = null;
        if (null != this._neighboursDic[size])
            e = this._neighboursDic[size];
        else {
            e = [];
            for (let j = -size; j <= size; j++)
                for (var i = -size; i <= size; i++)
                    0 == i && 0 == j || Math.abs(i) + Math.abs(j) > size || e.push([i, j]);
            this._neighboursDic[size] = e;
        }
        return e;
    }

    /**
     *测试寻路步骤 
     * @param startNode
     * @param targetNode
     * @return 
     */
    public testSeekPathStep(startNode: RoadNode, targetNode: RoadNode, size:number, callback: Function, target: any, time: number = 100): void {
        this._startNode = startNode;
        this._currentNode = startNode;
        this._targetNode = targetNode;
        this._neighbours = this.getNeighbours(size);
        if (!this.isCanPass(this._targetNode))
            return;

        this._startNode.g = 0; //重置起始节点的g值
        this._startNode.resetTree(); //清除起始节点原有的二叉堆关联关系

        this._binaryTreeNode.refleshTag(); //刷新二叉堆tag，用于后面判断是不是属于当前次的寻路
        //this._binaryTreeNode.addTreeNode(this._startNode); //把起始节点设置为二叉堆结构的根节点

        this._closelist = [];

        let step: number = 0;

        clearInterval(this.handle);
        this.handle = setInterval(() => {
            if (step > this.maxStep) {
                console.warn("超过目标计算步骤为：", step);
                clearInterval(this.handle);
                return;
            }

            step++;

            this.searchRoundNodes(this._currentNode);

            if (this._binaryTreeNode.isTreeNull()) //二叉堆树里已经没有任何可搜寻的点了，则寻路结束，每找到目标
            {
                console.warn("没找到目标计算步骤为：", step);
                clearInterval(this.handle);
                return;
            }

            this._currentNode = this._binaryTreeNode.getMin_F_Node();

            if (this._currentNode == this._targetNode) {
                console.log("找到目标计算步骤为：", step);
                clearInterval(this.handle);

                this._openlist = this._binaryTreeNode.getOpenList();
                callback.apply(target, [this._startNode, this._targetNode, this._currentNode, this._openlist, this._closelist, this.getPath()]);
            } else {
                this._binaryTreeNode.setRoadNodeInCloseList(this._currentNode);//打入关闭列表标记
                this._openlist = this._binaryTreeNode.getOpenList();
                this._closelist.push(this._currentNode);
                callback.apply(target, [this._startNode, this._targetNode, this._currentNode, this._openlist, this._closelist, null]);
            }

        }, time);

    }

    /**
     *查找一个节点周围可通过的点 
     * @param node
     * @return 
     */
    private searchRoundNodes(node: RoadNode): void {
        for (let i: number = 0; i < this._round.length; i++) {
            let col: number = node.col + this._round[i][0];
            let row: number = node.row + this._round[i][1];
            let node2: RoadNode = this.getRoadNode(col, row);

            if (this.isCanPass(node2) && node2 != this._startNode && !this.isInCloseList(node2) && !this.inInCorner(node2)) {
                this.setNodeF(node2);
            }
        }
    }

    /**
     *设置节点的F值 
     * @param node
     */
    public setNodeF(node: RoadNode): void {
        let g: number;

        if (node.col == this._currentNode.col || node.row == this._currentNode.row) {
            g = this._currentNode.g + this.COST_STRAIGHT;
        } else {
            g = this._currentNode.g + this.COST_DIAGONAL;
        }

        if (this.isInOpenList(node)) {
            if (g < node.g) {
                node.g = g;

                node.parent = this._currentNode;
                node.h = (Math.abs(this._targetNode.col - node.col) + Math.abs(this._targetNode.row - node.row)) * this.COST_STRAIGHT;//曼哈顿估价法
                node.f = node.g + node.h;

                //节点的g值已经改变，把节点先从二堆叉树结构中删除，再重新添加进二堆叉树
                this._binaryTreeNode.removeTreeNode(node);
                this._binaryTreeNode.addTreeNode(node);
            }
        } else {
            node.g = g;

            this._binaryTreeNode.setRoadNodeInOpenList(node);//给节点打入开放列表的标志
            node.resetTree();

            node.parent = this._currentNode;
            node.h = (Math.abs(this._targetNode.col - node.col) + Math.abs(this._targetNode.row - node.row)) * this.COST_STRAIGHT;
            node.f = node.g + node.h;

            this._binaryTreeNode.addTreeNode(node);
        }
    }

    /**
     *节点是否在开启列表 
     * @param node
     * @return 
     */
    private isInOpenList(node: RoadNode): Boolean {
        return this._binaryTreeNode.isInOpenList(node);
    }

    /**
     * 节点是否在关闭列表 
     * @param node 
     * @returns 
     */
    private isInCloseList(node: RoadNode): Boolean {
        return this._binaryTreeNode.isInCloseList(node);
    }

    /**
     *节点是否在拐角处 
     * @return 
     */
    private inInCorner(node: RoadNode): Boolean {
        if (this._pathQuadSeek == PathQuadSeek.path_dire_4) {
            //如果是4方向寻路类型，则不可能有拐角，所以直接返回false;
            return false;
        }

        if (node.col == this._currentNode.col || node.row == this._currentNode.row) {
            return false;
        }

        let node1: RoadNode = this.getRoadNode(this._currentNode.col, node.row);
        let node2: RoadNode = this.getRoadNode(node.col, this._currentNode.row);

        if (this.isPassNode(node1) && this.isPassNode(node2)) {
            return false;
        }

        return true;
    }

      /** 获取当前时间(毫秒)*/
      private getTime() {
        return new Date().getTime();
    }

    /**
     * 释放资源
     */
    public dispose(): void {
        this._roadNodes = null;
        this._round = null;
    }
}
