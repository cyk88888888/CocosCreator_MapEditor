import { _decorator, Graphics } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
import { CONST } from '../../base/CONST';
import { MapMgr } from '../../base/MapMgr';
const { ccclass, property } = _decorator;

@ccclass('mapThingSelect')
export class mapThingSelect extends UIComp {
     private _graphics: Graphics;
     private _isShow: boolean;
     private _curDrawInfo: { x: number, y: number, width: number, height: number, alpha: number };
     private mapMgr: MapMgr;
     protected onEnter(): void {
          let self = this;
          self.mapMgr = MapMgr.inst;
          self.onEmitter(CONST.GEVT.UpdateMapScale, self.onMapScaleChg);
     }

     private onMapScaleChg() {
          let self = this;
          if (!self._isShow) return;
          let info = self._curDrawInfo;
          self.drawRect(info.x, info.y, info.width, info.height, info.alpha);
     }

     /**
      * 绘制矩形
      * @param x 绘制位置x
      * @param y 绘制位置y
      * @param size 格子大小
      * @param alpha 颜色透明度
      */
     public drawRect(x: number, y: number, width: number, height: number, alpha: number = 1) {
          let self = this;
          if (!self._graphics) self._graphics = self.node.getComponent(Graphics);
          self._curDrawInfo = { x: x, y: y, width: width, height: height, alpha: alpha };
          let lineWidth = 4 / self.mapMgr.mapScale;
          let offSet = lineWidth / 2;
          self._graphics.clear();
          self._graphics.lineWidth = lineWidth;
          self._graphics.moveTo(x - offSet, y - offSet);
          self._graphics.lineTo(x + width + offSet, y - offSet);
          self._graphics.lineTo(x + width + offSet, y + height + offSet);
          self._graphics.lineTo(x - offSet, y + height + offSet);
          self._graphics.lineTo(x - offSet, y - offSet);
          self._graphics.stroke();
          self._isShow = true;
     }

     public clear() {
          let self = this;
          if (self._graphics) self._graphics.clear();
          self._isShow = false;
     }

     public get isShow(): boolean {
          let self = this;
          return self._isShow;
     }
}


