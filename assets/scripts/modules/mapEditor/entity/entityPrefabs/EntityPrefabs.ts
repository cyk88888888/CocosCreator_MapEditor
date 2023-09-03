import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EntityPrefabs')
export class EntityPrefabs extends Component {
    @property({ type: Prefab })
    public playerPrefab: Prefab;

}

