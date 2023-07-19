import { _decorator, instantiate, Node, Prefab } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
import { SelectBoxItemComp } from './SelectBoxItemComp';
import { CONST } from '../../base/CONST';
const { ccclass, property } = _decorator;

@ccclass('SelectBoxContainerComp')
export class SelectBoxContainerComp extends UIComp {
     @property({ type: Prefab })
     public selectBoxItemPrefab: Prefab;
     @property({type: Node})
     private grp_items: Node;
     
     public deletegate: any;
     protected onEnter(): void {
          let self = this;
          // self.onEmitter(CONST.GEVT.ClickStage, self.onClickStage);
          self.onEmitter(CONST.GEVT.ClickSelecBoxItem, self.onClickStage);
     }

     protected dchg(): void {
          let self = this;
          let data = self.data || [];
          for(let i = 0; i < data.length; i++){
               let node = instantiate(self.selectBoxItemPrefab);
               let selectBoxItemComp = node.getComponent(SelectBoxItemComp);
               selectBoxItemComp.deletegate = self.deletegate;
               selectBoxItemComp.setData(data[i]);
               node.setParent(self.grp_items);
          }
     }

     private onClickStage(){
          let self = this;
          self.destory();
     }
}


