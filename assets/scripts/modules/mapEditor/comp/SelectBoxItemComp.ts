import { _decorator, Label, Node } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
import { CONST } from '../../base/CONST';
const { ccclass, property } = _decorator;

@ccclass('SelectBoxItemComp')
export class SelectBoxItemComp extends UIComp {
     @property({type: Label})
     private lbl_desc: Label;

     public deletegate: any;
     protected onEnter(): void {
          let self = this;
     }

     protected dchg(): void {
          let self = this;
          let data = self.data;
          self.lbl_desc.string = data.desc;
     }

     private onItemClick(){
          let self = this;
          let data = self.data;
          self.emit(CONST.GEVT.ClickSelecBoxItem, {type: data.type, desc: data.desc, deletegate: self.deletegate});
     }
}


