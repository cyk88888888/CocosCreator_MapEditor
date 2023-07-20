import { _decorator, EventMouse, Graphics, Label, Node, UITransform } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
import { CONST } from '../../base/CONST';
const { ccclass, property } = _decorator;

@ccclass('SelectBoxItemComp')
export class SelectBoxItemComp extends UIComp {
     @property({type: Label})
     private lbl_desc: Label;

     private _graphicBg: Graphics;
     private _uiTranform: UITransform;
     public __deletegate__: any;
     public __index__: number;
     protected onEnter(): void {
          let self = this;
          self._uiTranform = self.getComponent(UITransform);
          self._graphicBg = self.getComponent(Graphics);
          self.node.on(Node.EventType.MOUSE_ENTER, self.onMouseEnter, self);
          self.node.on(Node.EventType.MOUSE_LEAVE, self.onMouseLeave, self);
     }

     protected dchg(): void {
          let self = this;
          let data = self.data;
          self.lbl_desc.string = data.desc;
     }

     private onMouseEnter(e: EventMouse) {
          let self = this;
          let width = self._uiTranform.width;
          let height = self._uiTranform.height;
          self._graphicBg.rect(width/2, height/2, -width, -height);
          self._graphicBg.fill();
     }

     private onMouseLeave(e: EventMouse) {
          let self = this;
          self._graphicBg.clear();
     }

     private onItemClick(){
          let self = this;
          let data = self.data;
          self.emit(CONST.GEVT.ClickSelecBoxItem, {type: data.type, desc: data.desc, __deletegate__: self.__deletegate__, __index__: self.__index__});
     }
}


