import { _decorator, instantiate, Node, Prefab } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
import { SelectBoxItemComp } from './SelectBoxItemComp';
import { CONST } from '../../base/CONST';
const { ccclass, property } = _decorator;

@ccclass('SelectBoxContainerComp')
export class SelectBoxContainerComp extends UIComp {
     @property({ type: Prefab })
     public selectBoxItemPrefab: Prefab;
     @property({ type: Node })
     private grp_items: Node;

     public __deletegate__: any;
     private _hasTrigger: boolean;
     protected onEnter(): void {
          let self = this;
          self.onEmitter(CONST.GEVT.ClickStage, self.onClickStage);
     }

     protected dchg(): void {
          let self = this;
          let data = self.data || [];
          for (let i = 0; i < data.length; i++) {
               let node = instantiate(self.selectBoxItemPrefab);
               let selectBoxItemComp = node.getComponent(SelectBoxItemComp);
               selectBoxItemComp.__deletegate__ = self.__deletegate__;
               selectBoxItemComp.__index__ = i;
               selectBoxItemComp.setData(data[i]);
               node.setParent(self.grp_items);
          }
     }

     private onClickStage() {
          let self = this;
          if (!self._hasTrigger) {//这里设置是否已触发过，不然显示的时候就会监听到点击舞台，从而显示不出来
               self._hasTrigger = true;
               return;
          }
          self.destory();
     }
}


