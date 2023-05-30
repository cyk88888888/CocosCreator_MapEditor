/*
 * @Description: 
 * @Author: CYK
 * @Date: 2022-05-19 11:39:05
 */
import { Layers, Node, Scene, screen, Size, UIOpacity, UITransform, Vec2, view } from "cc";
import { scaleMode } from "./ScaleMode";
export namespace BaseUT {
    /** 获取宽度适配下屏幕的视图宽高*/
    export function getStageSize() {
        let size = screen.windowSize;
        size.width /= view.getScaleX();
        size.height /= view.getScaleY();
        return size;
    }
    /** 获取宽度适配下，layer容器宽高 */
    export function getLayerScaleSize() {
        let windowSize = BaseUT.getStageSize();
        let designHeight = windowSize.height < scaleMode.designHeight_max ? windowSize.height : scaleMode.designHeight_max;
        return new Size(windowSize.width, designHeight);
    }
    /**
     * 根据屏幕宽高自适应设置comp大小
     * @param comp 
     * @returns 
     */
    export function setFitSize(node: Node) {
        let scaleSize = BaseUT.getLayerScaleSize();
        BaseUT.setSize(node, scaleSize.width, scaleSize.height);
        return scaleSize;
    }

    /**获取一个新的ui节点node */
    export function newUINode(name?: string) {
        let newNode = new Node(name);
        newNode.addComponent(UITransform);
        newNode.addComponent(UIOpacity);
        newNode.layer = Layers.Enum.UI_2D;
        return newNode;
    }

    /**设置node透明度 */
    export function setAlpha(node: Node, alpha: number) {
        let Opacity = node.getComponent(UIOpacity);
        Opacity.opacity = 255 * alpha;
    }

    /**设置node锚点 */
    export function setPivot(node: Node, xv: number, yv: number) {
        let tranform = node.getComponent(UITransform);
        tranform.anchorX = xv;
        tranform.anchorY = yv;
    }

    /**设置node宽高 */
    export function setSize(node: Node, width: number, height: number) {
        let uiTransform = node.getComponent(UITransform);
        uiTransform.setContentSize(width, height);
    }

    /**获取node宽高 */
    export function getSize(node: Node | Scene) {
        let uiTransform = node.getComponent(UITransform);
        return new Size(uiTransform.width,uiTransform.height);
    }

    export function getFitY(min: number, max: number) {
        let windowSize = BaseUT.getLayerScaleSize();
        return min + (max - min) * (windowSize.height - 1068) / (1280 - 1068);
    }

      // 角度转弧度
      export function angle_to_radian (angle: number): number {
        // 角度转弧度公式
        // π / 180 * 角度

        // 计算出弧度
        let radian = Math.PI / 180 * angle;
        // 返回弧度
        return(radian);
    }


    // 弧度转角度
    export function radian_to_angle (radian: number): number {
        // 弧度转角度公式
        // 180 / π * 弧度

        // 计算出角度
        let angle = 180 / Math.PI * radian;
        // 返回弧度
        return(angle);
    }


    // 角度转向量   
    export function angle_to_vector (angle: number): Vec2 {
        // tan = sin / cos
        // 将传入的角度转为弧度
        let radian = this.angle_to_radian(angle);
        // 算出cos,sin和tan
        let cos = Math.cos(radian);// 邻边 / 斜边
        let sin = Math.sin(radian);// 对边 / 斜边
        let tan = sin / cos;// 对边 / 邻边
        // 结合在一起并归一化
        let vec = new Vec2(cos, sin).normalize();
        // 返回向量
        return(vec);
    }


    // 向量转角度
    export function vector_to_angle (vector: Vec2): number {
        // 将传入的向量归一化
        let dir = vector.normalize();
        // 计算出目标角度的弧度
        let radian = dir.signAngle(new Vec2(1, 0));
        // 把弧度计算成角度
        let angle = -this.radian_to_angle(radian);
        // 返回角度
        return(angle);
    }
}