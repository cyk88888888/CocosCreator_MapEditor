import { _decorator, Graphics } from 'cc';
import { UIComp } from '../../../../../extensions/cocos-framework/src/ui/UIComp';
const { ccclass, property } = _decorator;

@ccclass('ColorGrid')
export class ColorGrid extends UIComp {
     private _graphics: Graphics;
     /**
      * 绘制矩形颜色格子
      * @param color 格子颜色
      * @param x 绘制位置x
      * @param y 绘制位置y
      * @param size 格子大小
      * @param alpha 格子颜色透明度
      */
     public drawRect(color: string, x: number, y: number, width: number, heigth: number, alpha: number = 0.5) {
          let self = this;
          if(!self._graphics) self._graphics = self.node.getComponent(Graphics);
          let fillColor = self._graphics.fillColor;
          fillColor.fromHEX(color);
          self._graphics.fillColor.set(fillColor.r, fillColor.g, fillColor.b, alpha * 255);
          self._graphics.rect(x, y, width, heigth);
          self._graphics.fill();
     }

     public clear() {
          let self = this;
          self._graphics.clear();
     }
}


