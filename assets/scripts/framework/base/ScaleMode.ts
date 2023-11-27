/** 
 * @descripttion 页面缩放参数设置
 * @author cyk
 * @date 2022-05-19 10:49:35
 */
export class ScaleMode {
    /**
     * 设计宽度
     */
    public designWidth: number;
     /**
     * 设计高度
     */
    public designHeight: number;
    /**
     * 设计最小宽度
     */
    public designWidth_min: number;
     /**
     * 设计最大宽度
     */
    public designWidth_max: number;
}
export let scaleMode = new ScaleMode();