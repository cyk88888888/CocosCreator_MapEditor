import { _decorator, Graphics, Sprite, SpriteFrame } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
import { CONST } from '../../base/CONST';
import { ResMgr } from '../../../framework/mgr/ResMgr';
import { BaseUT } from '../../../framework/base/BaseUtil';
const { ccclass, property } = _decorator;

@ccclass('ColorGrid')
export class ColorGrid extends UIComp {
     /** 预制体路径 */
     public static prefabUrl: string = 'prefab/mapEditor/grid/ColorGrid';

     private _graphics: Graphics;
     /**
      * 绘制矩形颜色格子
      * @param color 格子颜色
      * @param x 绘制位置x
      * @param y 绘制位置y
      * @param size 格子大小
      */
     public drawRect(color: string, x: number, y: number, size: number) {
          let self = this;
          if (!self._graphics) {
               self._graphics = self.node.getComponent(Graphics);
          }
          self._graphics.clear();
          self._graphics.fillColor.fromHEX(color);
          self._graphics.rect(x, y, size, size);
          self._graphics.fill();
     }
}


