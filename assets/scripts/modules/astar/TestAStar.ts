import { _decorator, Component, Node, Graphics, UITransform, EventTouch, Label, Prefab, instantiate, Vec3, Widget, Vec2 } from 'cc';
import { BaseUT } from '../../framework/base/BaseUtil';
import { TickMgr } from '../../framework/mgr/TickMgr';
import { UIComp } from '../../framework/ui/UIComp';
import { Sp } from '../../framework/uiComp/Sp';
import { MessageTip } from '../common/message/MessageTip';
import { AStar } from './AStar';
import { Grid } from './Grid';
import { Nodes } from './Nodes';
const { ccclass, property } = _decorator;

/**
 * 测试AStar（平路情况下（代价因子一样大））
 * @author CYK
 */
@ccclass('TestAStar')
export class TestAStar extends UIComp {
    @property({ type: Node })
    public grp_container: Node;
    @property({ type: Graphics })
    public graphicsGrid: Graphics;
    @property({ type: Graphics })
    public graphicsBlock: Graphics;
    @property({ type: Graphics })
    public graphicsPath: Graphics;
    @property({ type: Graphics })
    public graphicsPlayer: Graphics;
    @property({ type: Sp })
    public sp_player: Sp;
    @property({ type: Label })
    public lbl_cost: Label;
    @property({ type: Node })
    public groundParent: Node;
    @property({ type: Prefab })
    public ground: Prefab;
    @property({ type: Node })
    public wallParent: Node;
    @property({ type: Prefab })
    public wall: Prefab;

    private _widget: Widget;
    private _cellSize: number;
    private _grid: Grid;
    private _index: number;
    private _path: Nodes[];
    private _speed: number;//人物移动速度
    private _prePos: Vec2;
    private _toDistance: number;
    private _moveDir: Vec2;
    protected onFirstEnter() {
        let self = this;
        self._cellSize = 40;
        self._speed = 300;
        self._widget = self.getComponent(Widget);
        TickMgr.inst.nextTick(() => {
            self.initGrid();
            self.onReset();
        }, this)
    }

    private initGrid() {
        let self = this;
        let screenWh = self.screenWh;
        let width = screenWh[0];
        let height = screenWh[1];
        let numCols = Math.floor(width / self._cellSize);
        let numRows = Math.floor(height / self._cellSize);

        self._grid = new Grid();
        self._grid.init(numCols, numRows);

        let lineGraphics = self.graphicsGrid;
        lineGraphics.clear();
        lineGraphics.lineWidth = 3;
        for (let i = 0; i < numCols + 1; i++)//画竖线
        {
            lineGraphics.moveTo(i * self._cellSize, 0);
            lineGraphics.lineTo(i * self._cellSize, numRows * self._cellSize);
        }


        for (let i = 0; i < numRows + 1; i++)//画横线
        {
            lineGraphics.moveTo(0, i * self._cellSize);
            lineGraphics.lineTo(numCols * self._cellSize, i * self._cellSize);
        }
        lineGraphics.stroke();
        let len = numCols * numRows;
        for (let i = 0; i < len; i++) {
            let ground = instantiate(this.ground);
            this.groundParent.addChild(ground);
        }
    }

    private makeBlock() {
        let self = this;
        let blockGraphics = self.graphicsBlock;
        blockGraphics.clear();
        let wallParent = this.wallParent;
        wallParent.removeAllChildren();
        let bolckCount = Math.floor((self._grid.numCols * self._grid.numRows) / 4);
        for (let i = 0; i < bolckCount; i++) {
            let _x = Math.floor(Math.random() * self._grid.numCols);
            let _y = Math.floor(Math.random() * self._grid.numRows);
            self._grid.setWalkable(_x, _y, false);
            let node = self._grid.getNode(_x, _y);
            blockGraphics.fillColor.fromHEX(self.getColor(node));
            blockGraphics.rect(_x * self._cellSize, _y * self._cellSize, self._cellSize, self._cellSize);
            blockGraphics.fill();
            let wall = instantiate(this.wall);
            wallParent.addChild(wall);
            wall.setPosition(new Vec3(_x * self._cellSize, _y * self._cellSize))
        }
    }

    /** 生成一个player角色 */
    private makePlayer() {
        let self = this;
        let radius = 13;//半径
        self.graphicsPlayer.clear();
        self.graphicsPlayer.fillColor.fromHEX('#ff0000');
        self.graphicsPlayer.circle(0, 0, radius);
        self.graphicsPlayer.fill();

        let ranDomStaryPos = self._grid.getRanDomStartPos();
        let _x = ranDomStaryPos.x * self._cellSize + self._cellSize / 2;
        let _y = ranDomStaryPos.y * self._cellSize + self._cellSize / 2;
        self.graphicsPlayer.node.setPosition(_x, _y);
        self.sp_player.node.setPosition(self.graphicsPlayer.node.position);
    }

    private _tap_grp_container(event: EventTouch) {
        let self = this;
        let point = event.getUILocation();

        console.log('getUILocation: ' + event.getUILocation());
        console.log('getLocationInView: ' + event.getLocationInView());
        console.log('getLocation: ' + event.getLocation());
        console.log('getPreviousLocation: ' + event.getPreviousLocation());
        console.log('getStartLocation: ' + event.getStartLocation());
        console.log('getUIStartLocation: ' + event.getUIStartLocation());
        point.y -= (BaseUT.getStageSize().height - BaseUT.getLayerScaleSize().height) / 2 + self._widget.bottom;

        self.graphicsPath.clear();
        let xPos = Math.floor(point.x / self._cellSize);
        let yPos = Math.floor(point.y / self._cellSize);
        let node = self._grid.getNode(xPos, yPos);
        if (!node) return;
        self._grid.setEndNode(xPos, yPos);
        let endNode: Nodes = self._grid.endNode;
        if (endNode.walkable) {
            self.graphicsPath.fillColor.fromHEX(self.getColor(endNode));
            self.graphicsPath.rect(xPos * self._cellSize, yPos * self._cellSize, self._cellSize, self._cellSize);
            self.graphicsPath.fill();
        }
        let playerPos = self.graphicsPlayer.node.position;
        xPos = Math.floor(playerPos.x / self._cellSize);
        yPos = Math.floor(playerPos.y / self._cellSize);
        self._grid.setStartNode(xPos, yPos);
        self.findPath();
    }

    /** 寻路 */
    private findPath() {
        let self = this;
        let astar = new AStar();
        if (astar.findPath(self._grid)) {
            self.lbl_cost.string = "本次寻路总耗时: " + astar.costTotTime + "ms";
            self._path = astar.path;
            self._index = 0;
            let len = self._path.length - 1;//最后一点显示红色终点
            for (let i = 0; i < len; i++) {
                //把经过的点，涂上黄色
                let passedNode = self._path[i];
                self.graphicsPath.fillColor.fromHEX('#ffff00');
                self.graphicsPath.rect(passedNode.x * self._cellSize, passedNode.y * self._cellSize, self._cellSize, self._cellSize);
                self.graphicsPath.fill();
            }
            self.refMoveInfo();
        } else {
            MessageTip.show({ msg: '没找到最佳节点，无路可走!' });
        }
    }

    update(deltaTime: number) {
        let self = this;
        if (!self._path || !self._path.length || self._index >= self._path.length) return;
        let playerPos = self.sp_player.node.position;
        let dx = playerPos.x - self._prePos.x;
        let dy = playerPos.y - self._prePos.y;
        let moveDistance = Math.sqrt(dx * dx + dy * dy);//已走过多少距离
        if (moveDistance >= self._toDistance) {
            self._index++;//取一个路径节点
            if (self._index < self._path.length) {//达到最后一个节点
                self.refMoveInfo();
            } 
        } else {
            let oldPos = new Vec3(playerPos.x, playerPos.y);
            let newPos = new Vec3(playerPos.x + deltaTime * self._speed * self._moveDir.x, playerPos.y + deltaTime * self._speed * self._moveDir.y);
            self.graphicsPlayer.node.setPosition(newPos);
            self.sp_player.node.setPosition(newPos);
            if (newPos.x != oldPos.x && Math.abs(newPos.x - oldPos.x) > 0.5) {//防止左右摇头
                let dir = newPos.x > oldPos.x ? 1 : -1;
                self.sp_player.node.setScale(Math.abs(self.sp_player.node.scale.x) * dir, self.sp_player.node.scale.y);
            }
        }
    }

    private refMoveInfo() {
        let self = this;
        let playerPos = self.sp_player.node.position;
        self._prePos = new Vec2(playerPos.x, playerPos.y);
        let passedNode = self._path[self._index];
        let targetPos = new Vec2(passedNode.x * self._cellSize + self._cellSize / 2, passedNode.y * self._cellSize + self._cellSize / 2);
        let dx = targetPos.x - self._prePos.x;
        let dy = targetPos.y - self._prePos.y;
        self._toDistance = Math.sqrt(dx * dx + dy * dy);
        self._moveDir = new Vec2(dx, dy).normalize();
    }

    /**
     * 重置
     */
    private onReset() {
        let self = this;
        self._path = null;
        self.graphicsPath.clear();
        self._grid.resetWalkable();
        self.makeBlock();
        self.makePlayer();
    }

    private showGrid() {
        let self = this;
        self.graphicsGrid.node.active = !self.graphicsGrid.node.active;
        self.graphicsBlock.node.active = !self.graphicsBlock.node.active;
        self.graphicsPlayer.node.active = !self.graphicsPlayer.node.active;
        self.graphicsPath.node.active = !self.graphicsPath.node.active;
    }

    private get screenWh() {
        let self = this;
        let transform = self.grp_container.getComponent(UITransform);
        return [transform.contentSize.width, transform.contentSize.height];
    }

    /** 返回节点颜色 */
    private getColor(node: Nodes) {
        let self = this;
        if (!node.walkable)
            return '#000000';
        if (node == self._grid.startNode)
            return '#cccccc';
        if (node == self._grid.endNode)
            return '#ff0000';
        return '#ffffff';
    }

    protected onExit() {
        let self = this;
    }
}


