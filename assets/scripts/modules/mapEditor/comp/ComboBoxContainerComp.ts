import { _decorator, instantiate, Node, Prefab } from 'cc';
import { ComboBoxItemComp } from './ComboBoxItemComp';
import { CONST } from '../../base/CONST';
import { UIComp } from '../../../../../extensions/cocos-framework/src/ui/UIComp';
const { ccclass, property } = _decorator;

@ccclass('ComboBoxContainerComp')
export class ComboBoxContainerComp extends UIComp {
     @property({ type: Prefab })
     public comboBoxItemPrefab: Prefab;
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
               let node = instantiate(self.comboBoxItemPrefab);
               let comboBoxItemComp = node.getComponent(ComboBoxItemComp);
               comboBoxItemComp.__deletegate__ = self.__deletegate__;
               comboBoxItemComp.__index__ = i;
               comboBoxItemComp.setData(data[i]);
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


