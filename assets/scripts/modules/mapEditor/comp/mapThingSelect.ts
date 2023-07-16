import { _decorator, Graphics } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
const { ccclass, property } = _decorator;

@ccclass('mapThingSelect')
export class mapThingSelect extends UIComp {
     private _graphics: Graphics;
     private _isShow:boolean;
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
          self._graphics.clear();
          self._graphics.lineWidth = 2;
          self._graphics.moveTo(x, y);
          self._graphics.lineTo(x + width, y);
          self._graphics.lineTo(x + width, y + height);
          self._graphics.lineTo(x, y + height);
          self._graphics.lineTo(x, y);
          self._graphics.stroke();
          self._isShow = true;
     }

     public clear() {
          let self = this;
          if(self._graphics) self._graphics.clear();
          self._isShow = false;
     }

     public get isShow():boolean{
          let self = this;
          return self._isShow;
     }
}


