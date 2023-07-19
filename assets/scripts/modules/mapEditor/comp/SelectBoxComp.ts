import { _decorator, EventMouse, instantiate, Label, Node, Prefab, Sprite, SpriteFrame } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
import { SceneMgr } from '../../../framework/mgr/SceneMgr';
import { CONST } from '../../base/CONST';
import { SelectBoxContainerComp } from './SelectBoxContainerComp';
const { ccclass, property } = _decorator;

@ccclass('SelectBoxComp')
export class SelectBoxComp extends UIComp {
     @property({ type: Prefab })
     public selectBoxPrefab: Prefab;
     @property({ type: Node })
     private grp_touchArea: Node;
     @property({ type: Label })
     private lbl_type: Label;
     @property({ type: Sprite })
     private img_bg: Sprite;
     @property({ type: SpriteFrame })
     private normal: SpriteFrame;
     @property({ type: SpriteFrame })
     private hover: SpriteFrame;
     @property({ type: SpriteFrame })
     private press: SpriteFrame;

     public selectCb: Function;
     public selectCbCtx: any;

     private _selectedIndex: number;
     protected onEnter(): void {
          let self = this;
          self.onEmitter(CONST.GEVT.ClickSelecBoxItem, self.onClickSelecBoxItem);
          self.grp_touchArea.on(Node.EventType.MOUSE_DOWN, self.onMouseDown, self);
          // self.grp_touchArea.on(Node.EventType.MOUSE_UP, self.onMouseUp, self);
          self.grp_touchArea.on(Node.EventType.MOUSE_ENTER, self.onMouseEnter, self);
          self.grp_touchArea.on(Node.EventType.MOUSE_LEAVE, self.onMouseLeave, self);
     }


     public get selectedIndex() {
          let self = this;
          return self._selectedIndex;
     }

     public set selectedIndex(value: number) {
          let self = this;
          self._selectedIndex = value;
          if (self.data) {
               self.lbl_type.string = self.data[value]?.desc ?? "";
          }
     }

     private onClickSelecBoxItem(dt: any) {
          let self = this;
          if (dt.deletegate == self) {
               self.lbl_type.string = dt.desc;
               if (self.selectCb) self.selectCb.call(self.selectCbCtx, dt);
          }
     }

     private onMouseDown(e: EventMouse) {
          let self = this;
          self.img_bg.spriteFrame = self.press;
          let box = instantiate(self.selectBoxPrefab);
          let selectBoxContainerComp = box.getComponent(SelectBoxContainerComp);
          selectBoxContainerComp.deletegate = self;
          selectBoxContainerComp.setData(self.data);
          box.setParent(SceneMgr.inst.curScene.layer);
     }

     private onMouseEnter(e: EventMouse) {
          let self = this;
          self.img_bg.spriteFrame = self.hover;
     }

     private onMouseLeave(e: EventMouse) {
          let self = this;
          self.img_bg.spriteFrame = self.normal;
     }
}


