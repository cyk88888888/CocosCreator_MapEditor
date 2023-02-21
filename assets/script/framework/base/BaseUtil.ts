/*
 * @Description: 
 * @Author: CYK
 * @Date: 2022-05-19 11:39:05
 */
import { Layers, Node, Scene, screen, Size, UIOpacity, UITransform, view } from "cc";
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
}