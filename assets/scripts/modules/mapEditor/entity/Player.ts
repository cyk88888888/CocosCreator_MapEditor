import { _decorator, Node, UITransform, Vec3 } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
import { MapMgr } from '../../base/MapMgr';
import PathFindingAgent from '../../road/PathFindingAgent';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends UIComp {
    @property({ type: Node })
    private sp_player: Node;
    @property({ type: Node })
    private collider: Node;

    private _uiTranstorm: UITransform;
    private _colliderTrans: UITransform;
    /** 角色移动速度(1毫秒的移动速度)*/
    public speed: number;
    private _dir: number;
    protected ctor(): void {
        let self = this;
        self.speed = 4;
    }

    protected onEnter(): void {
        let self = this;
        self._uiTranstorm = self.node.getComponent(UITransform);
        self._colliderTrans = self.collider.getComponent(UITransform);
    }

    public moveByJoyStick(radian: number) {
        let self = this;
        let playerPos = self.node.position;
        let cos = Math.cos(radian);
        let sin = Math.sin(radian);
        let toX = playerPos.x + self.speed * cos;
        let toY = playerPos.y + self.speed * sin;
        let pathFindingAgent = PathFindingAgent.inst;
        let dir = cos > 0 ? 1 : -1;
        let checkX = toX + dir * (self.colliderWidth / 2);
        if (pathFindingAgent.isCanMoveTo(checkX, playerPos.y)) {
            self.node.setPosition(toX, playerPos.y);
        }
        let checkY = sin > 0 ? toY + self.colliderHeight : toY;
        if (pathFindingAgent.isCanMoveTo(playerPos.x, checkY)) {
            self.node.setPosition(playerPos.x, toY);
        } else {
            console.log(self.node.position);
        }
        // console.log('cos: ' + cos, 'sin: ' + sin);
        self.setDir(dir);
        self.checkLimitPos();
    }

    public setDir(dir: number) {
        let self = this;
        if (self._dir == dir) return;
        self._dir = dir;
        let scale = self.sp_player.scale;
        self.sp_player.setScale(dir, scale.y);
    }

    /**检测移动边界 */
    private checkLimitPos() {
        let self = this;
        let pos = self.node.position;
        let halfWid = self.colliderWidth / 2;
        if (pos.x < halfWid) {
            self.node.setPosition(halfWid, pos.y);
        }
        let mapMgr = MapMgr.inst;
        let mapWidth = mapMgr.mapWidth;
        if (pos.x > mapWidth - halfWid) {
            self.node.setPosition(mapWidth - halfWid, pos.y);
        }

        if (pos.y < 0) {
            self.node.setPosition(pos.x, 0);
        }
        let height = self.colliderHeight;
        let mapHeight = mapMgr.mapHeight;
        if (pos.y > mapHeight - height) {
            self.node.setPosition(pos.x, mapHeight - height);
        }
    }

    /**碰撞器宽度 */
    private get colliderWidth(): number {
        return this._colliderTrans.width;
    }

    /**碰撞器高度 */
    private get colliderHeight(): number {
        return this._colliderTrans.height;
    }

    /**角色宽度 */
    public get width() {
        return this._uiTranstorm.width;
    }

    /**角色高度 */
    public get height() {
        return this._uiTranstorm.height;
    }
}

