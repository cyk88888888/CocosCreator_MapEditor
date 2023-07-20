import { _decorator, EventMouse, instantiate, Label, Node, Prefab, Sprite, SpriteFrame, UITransform, Vec3 } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
import { SceneMgr } from '../../../framework/mgr/SceneMgr';
import { CONST } from '../../base/CONST';
import { SelectBoxContainerComp } from './SelectBoxContainerComp';
const { ccclass, property } = _decorator;
/*
 * @Descripttion: 下拉框选中组件
 * @Author: CYK
 * @Date: 2023-07-19 20:00:00
 */
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

     private _selectedIndex: number;
     private _selectBoxContainerComp: SelectBoxContainerComp;
     protected onEnter(): void {
          let self = this;
          self.onEmitter(CONST.GEVT.ClickSelecBoxItem, self.onClickSelecBoxItem);
          self.grp_touchArea.on(Node.EventType.MOUSE_DOWN, self.onMouseDown, self);
          self.grp_touchArea.on(Node.EventType.MOUSE_ENTER, self.onMouseEnter, self);
          self.grp_touchArea.on(Node.EventType.MOUSE_LEAVE, self.onMouseLeave, self);
     }

     public get selectedIndex() {
          let self = this;
          return self._selectedIndex;
     }

     public set selectedIndex(value: number) {
          let self = this;
          if (self.data && value < self.data.length) {
               self._selectedIndex = value;
               let itemData = self.data[value];
               self.lbl_type.string = itemData.desc;
               self.node.emit(CONST.GEVT.ComboBox_Change, itemData);
          }else{
               console.error('设置下拉框超出索引');
          }
     }

     private onClickSelecBoxItem(dt: any) {
          let self = this;
          if (dt.__deletegate__ == self) {
               self.selectedIndex = dt.__index__;
          }
     }

     private onMouseDown(e: EventMouse) {
          let self = this;
          self.img_bg.spriteFrame = self.press;
          if (self._selectBoxContainerComp && !self._selectBoxContainerComp.hasDestory) {
               self._selectBoxContainerComp.node.destroy();
               self._selectBoxContainerComp = null;
          } else {
               let box = instantiate(self.selectBoxPrefab);
               let selectBoxContainerComp = self._selectBoxContainerComp = box.getComponent(SelectBoxContainerComp);
               selectBoxContainerComp.__deletegate__ = self;
               selectBoxContainerComp.setData(self.data);
               let uiTransform = self.node.getComponent(UITransform);
               let worldPos = uiTransform.convertToWorldSpaceAR(new Vec3(0, -uiTransform.height / 2, 0));
               let parent = SceneMgr.inst.curScene;
               let localUIPos = parent.uiTransform.convertToNodeSpaceAR(new Vec3(worldPos.x, worldPos.y, 0));
               box.setParent(parent.node);
               box.setPosition(new Vec3(localUIPos.x, localUIPos.y));
          }
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

