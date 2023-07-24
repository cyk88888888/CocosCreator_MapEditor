import { EditBox, Label, Node, Vec3, _decorator } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
import { CONST } from '../../base/CONST';
import { G } from '../../base/Interface';
import { MapMgr } from '../../base/MapMgr';
import { BaseUT } from '../../../framework/base/BaseUtil';
import { MessageTip } from '../../common/message/MessageTip';
import { ComboBoxComp } from './ComboBoxComp';
const { ccclass, property } = _decorator;
/*
 * @Descripttion: 场景物件属性面板
 * @Author: CYK
 * @Date: 2023-07-19 20:00:00
 */
@ccclass('MapThingPropertyComp')
export class MapThingPropertyComp extends UIComp {
     @property({ type: Label })
     private lbl_propertyName: Label;
     @property({ type: EditBox })
     private lbl_taskId: EditBox;
     @property({ type: EditBox })
     private lbl_groupId: EditBox;
     @property({ type: EditBox })
     private lbl_groupId2: EditBox;
     @property({ type: EditBox })
     private lbl_x: EditBox;
     @property({ type: EditBox })
     private lbl_y: EditBox;
     @property({ type: EditBox })
     private lbl_anchorX: EditBox;
     @property({ type: EditBox })
     private lbl_anchorY: EditBox;
     @property({ type: Label })
     private lbl_thingRect: Label;
     @property({ type: Label })
     private lbl_thingName: Label;
     @property({ type: ComboBoxComp })
     private combo_taskType: ComboBoxComp;
     @property({ type: ComboBoxComp })
     private combo_triggerType: ComboBoxComp;
     @property({ type: Node })
     private grp_mapThingInfo: Node;
     @property({ type: Node })
     private grp_bevel: Node;

     private mapMgr: MapMgr;
     protected onEnter(): void {
          let self = this;
          self.mapMgr = MapMgr.inst;
          self.onEmitter(CONST.GEVT.ClickMapTing, self.onClickMapTing);
          self.onEmitter(CONST.GEVT.ChangeGridType, self.onChangeGridType);
          self.onEmitter(CONST.GEVT.ClearCurMapThingInfo, self.onClearCurMapThingInfo);

          self.combo_triggerType.setData(self.mapMgr.triggerTypes);
          self.combo_triggerType.node.on(CONST.GEVT.ComboBox_Change, self.onClickTriggerType, self);
          self.combo_triggerType.selectedIndex = 0;
          self.grp_mapThingInfo.active = self.grp_bevel.active = false;
     }

     public init(data: any) {
          let self = this;
          let thingTypeList = data.thingPram?.thingTypeList ?? [];
          self.combo_taskType.setData(thingTypeList);
          self.combo_taskType.node.on(CONST.GEVT.ComboBox_Change, self.onClickTaskType, self);
          self.combo_taskType.selectedIndex = 0;
     }

     private onChangeGridType(dt: any) {
          let self = this;
          let type: string = "";
          if (dt.gridType == CONST.GridType.GridType_mapThing) {
               type = "场景物件";
          } else {
               type = "路点";
          }
          self.lbl_propertyName.string = type;
     }

     private onClickMapTing() {
          let self = this;
          let curMapThingInfo: G.MapThingInfo = self.mapMgr.curMapThingInfo;
          let isBelve: boolean = curMapThingInfo.type == CONST.MapThingType.bevel;//是否为斜角顶点
          if (isBelve) {
               self.lbl_groupId2.string = curMapThingInfo.groupIdStr ? curMapThingInfo.groupIdStr : '';
          } else {
               self.lbl_taskId.string = (curMapThingInfo.taskId || '') + '';
               self.lbl_groupId.string = (curMapThingInfo.groupId || '') + '';
               self.lbl_x.string = curMapThingInfo.x + '';
               self.lbl_y.string = curMapThingInfo.y + '';
               self.lbl_anchorX.string = curMapThingInfo.anchorX + '';
               self.lbl_anchorY.string = curMapThingInfo.anchorY + '';
               self.lbl_thingRect.string = curMapThingInfo.width + "," + curMapThingInfo.height;
               self.lbl_thingName.string = curMapThingInfo.thingName;
               self.combo_taskType.selectedIndex = curMapThingInfo.type - 1;
          }

          self.grp_mapThingInfo.active = !isBelve;
          self.grp_bevel.active = isBelve;
     }

     private onClearCurMapThingInfo() {
          let self = this;
          self.grp_mapThingInfo.active = self.grp_bevel.active = false;
     }

     private onClickTaskType(dt: any) {
          let self = this;
          if (self.mapMgr.curMapThingInfo) self.mapMgr.curMapThingInfo.type = dt.type;
     }

     private onClickTriggerType(dt: any) {
          let self = this;
          self.mapMgr.curMapThingTriggerType = dt.type;
     }

     private onFocusOutTaskId(editBox: EditBox) {
          let self = this;
          if (self.mapMgr.curMapThingInfo) self.mapMgr.curMapThingInfo.taskId = Number(editBox.string);
     }

     private onFocusOutGroupId(editBox: EditBox) {
          let self = this;
          if (self.mapMgr.curMapThingInfo) self.mapMgr.curMapThingInfo.groupId = Number(editBox.string);
     }

     private onFocusOutGroupId2(editBox: EditBox) {
          let self = this;
          let curMapThingInfo = self.mapMgr.curMapThingInfo;
          if (curMapThingInfo) {
               let reg = /^(\d+,?)+$/;//是否只包含数字和英文逗号
               let inputStr = editBox.string;
               let isLegal = reg.test(inputStr);
               curMapThingInfo.groupIdStr = isLegal ? editBox.string : curMapThingInfo.groupIdStr;
               if (!isLegal) {
                    editBox.string = curMapThingInfo.groupIdStr;
                    MessageTip.show({ msg: "输入内容不合法" });
               }
          }
     }

     private onFocusOutX(editBox: EditBox) {
          let self = this;
          let mapMgr = self.mapMgr;
          let curMapThingInfo = mapMgr.curMapThingInfo;
          if (curMapThingInfo) {
               let oldX: number = curMapThingInfo.x, oldY: number = curMapThingInfo.y;
               let mapThingComp = mapMgr.getMapThingCompByXY(oldX, oldY);
               let newX = Number(editBox.string);
               mapThingComp.setPosition(new Vec3(newX, oldY));
               curMapThingInfo.x = newX;
               mapThingComp.name = Math.floor(newX) + "_" + Math.floor(oldY);
               mapMgr.mapThingMap[mapThingComp.name] = [curMapThingInfo, mapThingComp];
               self.emit(CONST.GEVT.ChangeMapThingXY, { x: newX, y: oldY, width: curMapThingInfo.width, height: curMapThingInfo.height });
          }
     }

     private onFocusOutY(editBox: EditBox) {
          let self = this;
          let mapMgr = self.mapMgr;
          let curMapThingInfo = mapMgr.curMapThingInfo;
          if (curMapThingInfo) {
               let oldX: number = curMapThingInfo.x, oldY: number = curMapThingInfo.y;
               let mapThingComp = mapMgr.getMapThingCompByXY(oldX, oldY);
               let newY = Number(editBox.string);
               mapThingComp.setPosition(new Vec3(oldX, newY));
               curMapThingInfo.y = newY;
               mapThingComp.name = Math.floor(oldX) + "_" + Math.floor(newY);
               mapMgr.mapThingMap[mapThingComp.name] = [curMapThingInfo, mapThingComp];
               self.emit(CONST.GEVT.ChangeMapThingXY, { x: oldX, y: newY, width: curMapThingInfo.width, height: curMapThingInfo.height });
          }
     }

     private onFocusOutAnchorX(editBox: EditBox) {
          let self = this;
          let mapMgr = self.mapMgr;
          let curMapThingInfo = mapMgr.curMapThingInfo;
          if (curMapThingInfo) {
               let mapThingComp = mapMgr.getMapThingCompByXY(curMapThingInfo.x, curMapThingInfo.y);
               let reg = /^[\.\d]*$/;//是否只包含数字和小数点
               let inputStr = editBox.string;
               let isLegal = reg.test(inputStr);
               curMapThingInfo.anchorX = isLegal ? Number(inputStr) : curMapThingInfo.anchorX;
               let anchorX: number = curMapThingInfo.anchorX, anchorY: number = curMapThingInfo.anchorY;
               BaseUT.setPivot(mapThingComp, anchorX, anchorY);
               if (!isLegal) {
                    editBox.string = anchorX + "";
                    MessageTip.show({ msg: "输入内容不合法" });
               }
          }
     }

     private onFocusOutAnchorY(editBox: EditBox) {
          let self = this;
          let mapMgr = self.mapMgr;
          let curMapThingInfo = mapMgr.curMapThingInfo;
          if (curMapThingInfo) {
               let mapThingComp = mapMgr.getMapThingCompByXY(curMapThingInfo.x, curMapThingInfo.y);
               let reg = /^[\.\d]*$/;//是否只包含数字和小数点
               let inputStr = editBox.string;
               let isLegal = reg.test(inputStr);
               curMapThingInfo.anchorY = isLegal ? Number(inputStr) : curMapThingInfo.anchorY;
               let anchorX: number = curMapThingInfo.anchorX, anchorY: number = curMapThingInfo.anchorY;
               BaseUT.setPivot(mapThingComp, anchorX, anchorY);
               if (!isLegal) {
                    editBox.string = anchorY + "";
                    MessageTip.show({ msg: "输入内容不合法" });
               }
          }
     }
}


