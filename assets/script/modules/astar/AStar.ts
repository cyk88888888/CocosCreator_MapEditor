
import { _decorator } from 'cc';
import { Grid } from './Grid';
import { Nodes } from './Nodes';
const { ccclass, property } = _decorator;


@ccclass('AStar')
export class AStar {
    
    private _open: Nodes[];//开放列表
    private _closed: Nodes[];//封闭列表
    private _grid: Grid;
    private _endNode: Nodes;//终点
    private _startNode: Nodes;//起点
    private _path: Nodes[];//最终的路径节点
    // private _heuristic:Function = this.manhattan;
    // private _heuristic:Function = this.euclidian;
    private _heuristic: Function = this.diagonal; //估计公式
    private _straightCost: number = 1.0; //直线代价
    private _diagCost: number = Math.SQRT2; //对角线代价
    private _startCalculateTime: number;//计算本次寻路的开始时间
    public costTotTime: number;//计算本次寻路的总耗时


     //判断节点是否开放列表
     private isOpen(node: Nodes): boolean {
        let self = this;
        return self._open.indexOf(node) > -1;
    }

    //判断节点是否封闭列表
    private isClosed(node: Nodes): boolean {
        let self = this;
        return self._closed.indexOf(node) > -1;
    }

    //对指定的网络寻找路径
    public findPath(grid: Grid): boolean {
        let self = this;
        self._grid = grid;
        self._open = [];
        self._closed = [];
        self._startNode = self._grid.startNode;
        self._endNode = self._grid.endNode;
        self._startNode.g = 0;
        self._startNode.h = self._heuristic(self._startNode);
        self._startNode.f = self._startNode.g + self._startNode.h;
        self._startCalculateTime = self.getTime();
        return self.search();
    }

      //计算周围节点代价的关键处理函数
      public search(): boolean {
        let self = this;
        let _t: number = 1;
        let node: Nodes = self._startNode;
        //如果当前节点不是终点
        while (node != self._endNode) {
            //找出相邻节点的x,y范围
            let startX = Math.max(0, node.x - 1);
            let endX = Math.min(self._grid.numCols - 1, node.x + 1);
            let startY = Math.max(0, node.y - 1);
            let endY = Math.min(self._grid.numRows - 1, node.y + 1);

            //循环处理所有相邻节点
            for (let i = startX; i <= endX; i++) {
                for (let j = startY; j <= endY; j++) {
                    let test: Nodes = self._grid.getNode(i, j);
                    //如果是当前节点，或者是不可通过的，且排除水平和垂直方向都是障碍物节点时的特例情况
                    if (test == node || !test.walkable || !self._grid.getNode(node.x, test.y).walkable || !self._grid.getNode(test.x, node.y).walkable) {
                        continue;
                    }

                    let cost: number = self._straightCost;
                    //如果是对象线，则使用对角代价
                    if (!((node.x == test.x) || (node.y == test.y))) {
                        cost = self._diagCost;
                    }

                    //计算test节点的总代价
                    let g: number = node.g + cost * test.costMultiplier;
                    let h: number = self._heuristic(test);
                    let f: number = g + h;


                    //如果该点在open或close列表中
                    if (self.isOpen(test) || self.isClosed(test)) {
                        //如果本次计算的代价更小，则以本次计算为准
                        if (f < test.f) {
                            // console.log("\n第", _t, "轮，有节点重新指向，x=", i, "，y=", j, "，g=", g, "，h=", h, "，f=", f, "，test=",test.toString());
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;//重新指定该点的父节点为本轮计算中心点
                        }
                    } else//如果还不在open列表中，则除了更新代价以及设置父节点，还要加入open数组
                    {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = node;
                        self._open.push(test);
                    }
                }
            }
            self._closed.push(node);//把处理过的本轮中心节点加入close节点

            //辅助调试，输出open数组中都有哪些节点
            // for (let i = 0; i < self._open.length; i++) {
            //    console.log(self._open[i].toString());
            // }

            if (self._open.length == 0) {
                // Message.show("没找到最佳节点，无路可走!");
                console.log("没找到最佳节点，无路可走!");
                let totTime = (self.getTime() - self._startCalculateTime) / 1000;
                self.costTotTime = totTime;
                console.log("本次寻路计算总耗时: " + totTime + "秒");
                return false;
            }
            self._open.sort((a: Nodes, b: Nodes) => a.f - b.f);//按总代价从小到大排序
            node = self._open.shift() as Nodes;//从open数组中删除代价最小的结节，同时把该节点赋值为node，做为下次的中心点
            // console.log("第", _t, "轮取出的最佳节点为：", node.toString());
            _t++;
        }
        //循环结束后，构建路径
        self.buildPath();
        return true;
    }

    //根据父节点指向，从终点反向连接到起点
    private buildPath() {
        let self = this;
        self._path = [];
        let node: Nodes = self._endNode;
        self._path.push(node);
        while (node != self._startNode) {
            node = node.parent;
            self._path.unshift(node);
        }
        let totTime = (self.getTime() - self._startCalculateTime) / 1000;
        self.costTotTime = totTime;
        console.log("本次寻路计算总耗时: " + totTime + "秒");
    }

    //获取当前时间(毫秒)
    private getTime(){
        return new Date().getTime();
    }
    //曼哈顿估价法
    private manhattan(node: Nodes): number {
        let self = this;
        return Math.abs(node.x - self._endNode.x) * self._straightCost + Math.abs(node.y - self._endNode.y) * self._straightCost;
    }

    //几何估价法
    private euclidian(node: Nodes): number {
        let self = this;
        let dx: number = node.x - self._endNode.x;
        let dy: number = node.y - self._endNode.y;
        return Math.sqrt(dx * dx + dy * dy) * self._straightCost;
    }

    //对角线估价法
    private diagonal(node: Nodes): number {
        let self = this;
        let dx = Math.abs(node.x - self._endNode.x);
        let dy = Math.abs(node.y - self._endNode.y);
        let diag = Math.min(dx, dy);
        let straight = dx + dy;
        return self._diagCost * diag + self._straightCost * (straight - 2 * diag);
    }

    //返回所有被计算过的节点(辅助函数)
    public get visited(): Nodes[] {
        let self = this;
        return self._closed.concat(self._open);
    }

    //返回open数组
    public get openArray(): Nodes[] {
        let self = this;
        return self._open;
    }

    //返回close数组
    public get closedArray(): Nodes[] {
        let self = this;
        return self._closed;
    }

    public get path(): Nodes[] {
        let self = this;
        return self._path;
    }

}


