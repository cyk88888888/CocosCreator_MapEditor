import { _decorator, Node, UITransform, Vec3 } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
import { MapMgr } from '../../base/MapMgr';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends UIComp {
    @property({ type: Node })
    private player: Node;

    private _uiTranstorm: UITransform;
    /** 角色移动速度*/
    public speed: number;
    private _dir: number;
    protected ctor(): void {
        let self = this;
        self.speed = 10;
    }

    protected onEnter(): void {
        let self = this;
        self._uiTranstorm = self.node.getComponent(UITransform);
    }

    public moveByJoyStick(radian: number) {
        let self = this;
        let playerPos = self.node.position;
        let cos = Math.cos(radian);
        let sin = Math.sin(radian);
        let newPos = new Vec3(playerPos.x + self.speed * cos, playerPos.y + self.speed * sin);
        self.node.setPosition(newPos);
        console.log('cos: ' + cos, "sin: " + sin);
        self.setDir(cos > 0 ? 1 : -1);
        self.checkLimitPos();
    }

    public setDir(dir: number) {
        let self = this;
        if (self._dir == dir) return;
        self._dir = dir;
        let scale = self.player.scale;
        self.player.setScale(dir, scale.y);
    }

    /**检测移动边界 */
    private checkLimitPos() {
        let self = this;
        let pos = self.node.position;
        let halfWid = self._uiTranstorm.width / 2;
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
        let height = self._uiTranstorm.height;
        let mapHeight = mapMgr.mapHeight;
        if (pos.y > mapHeight - height) {
            self.node.setPosition(pos.x, mapHeight - height);
        }
    }
}

