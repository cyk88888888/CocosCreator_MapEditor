import { _decorator, Sprite, SpriteFrame } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
import { CONST } from '../../base/CONST';
import { ResMgr } from '../../../framework/mgr/ResMgr';
import { BaseUT } from '../../../framework/base/BaseUtil';
const { ccclass, property } = _decorator;

@ccclass('ColorGrid')
export class ColorGrid extends UIComp {
     /** 预制体路径 */
     public static prefabUrl: string = 'prefab/mapEditor/grid/ColorGrid';

     private _sprite: Sprite;
     /**
      * 绘制矩形颜色格子
      * @param gridType 格子类型
      * @param size 格子大小
      * @param x 绘制位置x
      * @param y 绘制位置y
      */
     public drawRect(gridType: CONST.GridType, size: number) {
          let self = this;
          if (!self._sprite) {
               self._sprite = self.node.getComponent(Sprite);
          }
          let spriteFrame = self._sprite.spriteAtlas.getSpriteFrame(gridType);
          self._sprite.spriteFrame = <SpriteFrame>spriteFrame;
          BaseUT.setSize(self.node, size, size);
     }
}


