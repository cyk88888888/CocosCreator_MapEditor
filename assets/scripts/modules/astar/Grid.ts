
import { _decorator } from 'cc';
import { Nodes } from './Nodes';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Grid
 * DateTime = Tue Mar 29 2022 17:44:30 GMT+0800 (中国标准时间)
 * Author = cyk54088
 * FileBasename = Grid.ts
 * FileBasenameNoExtension = Grid
 * URL = db://assets/scripts/Grid.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('Grid')
export class Grid {

    private _startNode: Nodes;//开始节点
    private _endNode: Nodes;//目标节点
    private _nodes: any[];//节点数组
    private _numCols: number;//列数
    private _numRows: number;//行数

    public init(numCols: number, numRows: number){
        let self = this;
        self._numCols = numCols;
        self._numRows = numRows;
        self._nodes = [];
        for (let i = 0; i < self._numCols; i++) {
            self._nodes[i] = [];
            for (let j = 0; j < self._numRows; j++) {
                self._nodes[i][j] = new Nodes();
                self._nodes[i][j].init(i,j);
            }
        }
    }

    public resetWalkable(){
        let self = this;
        for (let i = 0; i < self._numCols; i++) {
            for (let j = 0; j < self._numRows; j++) {
                self._nodes[i][j].walkable = true;
            }
        }
    }

    public getNode(x: number, y: number) {
        let self = this;
        return self._nodes[x][y] as Nodes;
    }


    public setEndNode(x: number, y: number) {
        let self = this;
        self._endNode = self._nodes[x][y] as Nodes;
    }


    public setStartNode(x: number, y: number) {
        let self = this;
        self._startNode = self._nodes[x][y] as Nodes;
    }


    public setWalkable(x: number, y: number, value: boolean) {
        let self = this;
        self._nodes[x][y].walkable = value;
    }


    public get endNode(): Nodes {
        let self = this;
        return self._endNode;
    }


    public get numCols(): number {
        let self = this;
        return self._numCols;
    }


    public get numRows(): number {
        let self = this;
        return self._numRows;
    }


    public get startNode(): Nodes {
        let self = this;
        return self._startNode;
    }

    /** 获取可行走节点随机一点坐标**/
    public getRanDomStartPos(): Nodes {
        let self = this;
        let canWalkArr = [];
        for (let i: number = 0; i < self._numCols; i++) {
            for (let j: number = 0; j < self._numRows; j++) {
                let node: Nodes = self._nodes[i][j];
                if (node.walkable) canWalkArr.push(node);
            }
        }
        let randomIdx = Math.floor(Math.random() * canWalkArr.length);
        return canWalkArr[randomIdx];
    }
}


