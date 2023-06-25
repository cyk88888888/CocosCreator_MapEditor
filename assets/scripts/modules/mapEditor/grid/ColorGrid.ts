import { _decorator, Component, Graphics, Layers, Node } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
const { ccclass, property } = _decorator;

@ccclass('ColorGrid')
export class ColorGrid extends UIComp {
     /** 预制体路径 */
     public static prefabUrl: string = 'prefab/mapEditor/grid/ColorGrid';

     private _graphic: Graphics;
     /**
      * 绘制矩形颜色格子
      * @param color 颜色值
      * @param size 格子大小
      * @param x 绘制位置x
      * @param y 绘制位置y
      */
     public drawRect(color: string, size: number, x: number, y: number) {
          let self = this;
          if (!self._graphic) {
               self._graphic = self.node.getComponent(Graphics);
          }
          self._graphic.clear();
          self._graphic.fillColor.fromHEX(color);
          self._graphic.rect(x, y, size, size);
          self._graphic.fill();
     }
}


