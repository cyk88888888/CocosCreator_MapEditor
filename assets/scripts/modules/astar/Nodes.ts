
import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Nodes')
export class Nodes {

    public x: number;
    public y: number;
    public f: number;
    public g: number;
    public h: number;
    public walkable: Boolean = true;//是否可穿越（通常把障碍物节点设置为false）
    public parent: Nodes;
    public costMultiplier: number = 1;//代价因子

    public init(x: number, y: number) {
        let self = this;
        self.x = x;
        self.y = y;
    }

    public toString(): String {
        let self = this;
        return "x=" + self.x.toString() + ",y=" + self.y.toString() + ",g=" + Number(self.g).toFixed(1) + ",h=" + Number(self.h).toFixed(1) + ",f=" + Number(self.f).toFixed(1);
    }
}


