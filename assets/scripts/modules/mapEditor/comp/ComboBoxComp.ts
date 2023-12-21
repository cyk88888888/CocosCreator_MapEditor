import { _decorator, EventMouse, instantiate, Label, Node, Prefab, Sprite, SpriteFrame, UITransform, Vec3 } from 'cc';
import { CONST } from '../../base/CONST';
import { ComboBoxContainerComp } from './ComboBoxContainerComp';
import { UIComp } from '../../../../../extensions/cocos-framework/src/ui/UIComp';
import { SceneMgr } from '../../../../../extensions/cocos-framework/src/mgr/SceneMgr';
const { ccclass, property } = _decorator;
/** 
 * @descripttion 下拉框选中组件
 * @author cyk
 * @date 2023-07-19 20:00:00
 */
@ccclass('ComboBoxComp')
export class ComboBoxComp extends UIComp {
     @property({ type: Prefab })
     public comboBoxContainerPrefab: Prefab;
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
     private _comboBoxContainerComp: ComboBoxContainerComp;
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
          if (self._comboBoxContainerComp && !self._comboBoxContainerComp.isDestory) {
               self._comboBoxContainerComp.node.destroy();
               self._comboBoxContainerComp = null;
          } else {
               let box = instantiate(self.comboBoxContainerPrefab);
               let selectBoxContainerComp = self._comboBoxContainerComp = box.getComponent(ComboBoxContainerComp);
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


