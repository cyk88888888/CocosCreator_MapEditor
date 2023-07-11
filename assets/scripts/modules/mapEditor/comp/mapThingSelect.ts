import { _decorator, Graphics } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
const { ccclass, property } = _decorator;

@ccclass('mapThingSelect')
export class mapThingSelect extends UIComp {
     private _graphics: Graphics;
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


          // let fillColor = self._graphics.fillColor;
          // fillColor.fromHEX("#FFFF00");
          // self._graphics.fillColor.set(fillColor.r, fillColor.g, fillColor.b, alpha * 255);
          // self._graphics.rect(x, y, width, heigth);
          // self._graphics.fill();
     }

     public clear() {
          let self = this;
          self._graphics.clear();
     }
}


