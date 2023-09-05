import { _decorator, instantiate, Node, Prefab } from 'cc';
import { Player } from '../entity/Player';
import { EntityPrefabs } from '../entity/entityPrefabs/EntityPrefabs';
import { JoyStickCtrl } from './JoyStickCtrl';
import PathFindingAgent from '../../road/PathFindingAgent';
const { ccclass, property } = _decorator;

/**测试运行时的实体管理类 */
@ccclass('EntityCtrl')
export class EntityCtrl {
    private grp_entity: Node;
    public player: Player;

    public constructor(grp_entity: Node) {
        let self = this;
        self.init(grp_entity);
    }

    private init(grp_entity: Node) {
        let self = this;
        self.grp_entity = grp_entity;

        self.addPlayer();
    }

    private addPlayer() {
        let self = this;
        let entityPrefabs = self.grp_entity.getComponent(EntityPrefabs);
        let playerNode = instantiate(entityPrefabs.playerPrefab);
        playerNode.setParent(self.grp_entity);
        let startPos = PathFindingAgent.inst.getRandomStartPos();
        playerNode.setPosition(startPos.x, startPos.y);
        self.player = playerNode.getComponent(Player);
    }

    public update(deltaTime: number) {
        //控制角色根据摇杆弧度方向移动
        if (JoyStickCtrl.inst.isMoving){
            let self = this;
            let radian = JoyStickCtrl.inst.radian;
            self.player.moveByJoyStick(radian);
        } 
    }

    public clear() {
        let self = this;
        if (self.player) {
            self.player.node.destroy();
            self.player = null;
        }

    }
}

