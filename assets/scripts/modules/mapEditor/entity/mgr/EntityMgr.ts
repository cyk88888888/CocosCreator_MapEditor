import { _decorator, instantiate, Node, Prefab } from 'cc';
import { TickMgr } from '../../../../framework/mgr/TickMgr';
import { Player } from '../Player';
import { EntityPrefabs } from '../entityPrefabs/EntityPrefabs';
const { ccclass, property } = _decorator;

/**测试运行时的实体管理类 */
@ccclass('EntityMgr')
export class EntityMgr {
    private static _inst: EntityMgr;

    private grp_scrollMap: Node;
    private grp_entity: Node;
    private _player: Player;
    public static get inst() {
        if (!this._inst) {
            this._inst = new EntityMgr();
        }
        return this._inst;
    }

    public init(grp_scrollMap: Node, grp_entity: Node) {
        let self = this;
        self.grp_scrollMap = grp_scrollMap;
        self.grp_entity = grp_entity;

        self.addPlayer();
        TickMgr.inst.addTick(self.update, self);
    }

    private addPlayer() {
        let self = this;
        let entityPrefabs = self.grp_entity.getComponent(EntityPrefabs);
        let playerNode = instantiate(entityPrefabs.playerPrefab);
        playerNode.setParent(self.grp_entity);
        self._player = playerNode.getComponent(Player);
    }

    public update(deltaTime: number) {
        console.log(deltaTime);
    }

    public clear() {
        let self = this;
        TickMgr.inst.rmTick(self.update);
        if (self._player) {
            self._player.node.destroy();
            self._player = null;
        }

    }
}

