import { _decorator, Node } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends UIComp {
    @property({ type: Node })
    private player: Node;
    start() {

    }

    update(deltaTime: number) {
        
    }
}

