import { EditBox, Label, Node, _decorator } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
import { CONST } from '../../base/CONST';
import { G } from '../../base/Interface';
import { MapMgr } from '../../base/MapMgr';
const { ccclass, property } = _decorator;

@ccclass('MapThingPropertyComp')
export class MapThingPropertyComp extends UIComp {
     @property({ type: Label })
     private lbl_propertyName: Label;
     @property({ type: Label })
     private lbl_thingRect: Label;
     @property({ type: EditBox })
     private lbl_groupId2: EditBox;
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
          self.grp_mapThingInfo.active = self.grp_bevel.active = false;
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
          self.grp_mapThingInfo.active = !!self.mapMgr.curMapThingInfo && dt.gridType == CONST.GridType.GridType_mapThing;
     }

     private onClickMapTing() {
          let self = this;
          let curMapThingInfo: G.MapThingInfo = self.mapMgr.curMapThingInfo;
          let isBelve: boolean = curMapThingInfo.type == CONST.MapThingType.bevel;//是否为斜角顶点
          if (isBelve) {
               self.lbl_groupId2.string = curMapThingInfo.groupIdStr ? curMapThingInfo.groupIdStr : "";
          } else {
               // txt_taskId.text = curMapThingInfo.taskId + "";
               // txt_groupId.text = curMapThingInfo.groupId + "";
               // txt_x.text = curMapThingInfo.x + "";
               // txt_y.text = curMapThingInfo.y + "";
               // txt_anchorX.text = curMapThingInfo.anchorX + "";
               // txt_anchorY.text = curMapThingInfo.anchorY + "";
               self.lbl_thingRect.string = curMapThingInfo.width + "," + curMapThingInfo.height;
               // combo_taskType.selectedIndex = curMapThingInfo.type - 1;
          }

          self.grp_mapThingInfo.active = !isBelve;
          self.grp_bevel.active = isBelve;
     }
}


