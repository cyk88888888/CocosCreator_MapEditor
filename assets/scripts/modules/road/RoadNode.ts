export default class RoadNode {

    private _px: number;//像素坐标x轴
    private _py: number;//像素坐标y轴
    private _col: number;//世界坐标x轴 真 （存储用）
    private _row: number;//世界坐标y轴 真 （存储用）
    private _dx: number;//直角坐标x轴
    private _dy: number;//直角坐标y轴
    private _value: number = 0;//节点的值
    private _f: number = 0; //路点的f值
    private _g: number = 0; //路点的g值	
    private _h: number = 0; //路点的h值
    private _parent: RoadNode = null; //路点的父节点


    //-------------二堆叉存储结构-----------------
    private _treeParent: RoadNode = null; //二堆叉结构的父节点

    private _left: RoadNode = null; //二堆叉结构的左子节点

    private _right: RoadNode = null; //二堆叉结构的右子节点

    private _openTag: number = 0; //是否在开启列表标记

    private _closeTag: number = 0; //是否在关闭列表标记

    public constructor() {
    }

    /**
     * 重置二叉堆存储信息
     */
    public resetTree() {
        this._treeParent = null;
        this._left = null;
        this._right = null;
    }

    public toString(): String {
        return "路点像素坐标：（" + this._px + "," + this._py + "),  " +
            "路点世界坐标：（" + this._col + "," + this._row + "),  " +
            "路点平面直角坐标：（" + this._dx + "," + this._dy + ")";
    }

    public get px(): number {
        return this._px;
    }

    public set px(value: number) {
        this._px = value;
    }

    public get py(): number {
        return this._py;
    }

    public set py(value: number) {
        this._py = value;
    }

    public get col(): number {
        return this._col;
    }

    public set col(value: number) {
        this._col = value;
    }

    public get row(): number {
        return this._row;
    }

    public set row(value: number) {
        this._row = value;
    }

    public get dx(): number {
        return this._dx;
    }

    public set dx(value: number) {
        this._dx = value;
    }

    public get dy(): number {
        return this._dy;
    }

    public set dy(value: number) {
        this._dy = value;
    }

    /** 路点是否可行走，0不可行走，1可行走*/
    public get value(): number {
        return this._value;
    }

    public set value(val: number) {
        this._value = val;
    }

    public get f(): number {
        return this._f;
    }

    public set f(value: number) {
        this._f = value;
    }

    public get g(): number {
        return this._g;
    }

    /** 起点到该点的估值*/
    public set g(value: number) {
        this._g = value;
    }

    public get h(): number {
        return this._h;
    }

    /** 该点到终点的估值*/
    public set h(value: number) {
        this._h = value;
    }

    public get parent(): RoadNode {
        return this._parent;
    }

    public set parent(value: RoadNode) {
        this._parent = value;
    }


    //-------------二堆叉存储结构-----------------

    /**
     * 二堆叉结构的父节点
     */
    public get treeParent(): RoadNode {
        return this._treeParent;
    }

    public set treeParent(value: RoadNode) {
        this._treeParent = value;
    }

    /**
     * 二堆叉结构的左子节点
     */
    public get left(): RoadNode {
        return this._left;
    }

    public set left(value: RoadNode) {
        this._left = value;
    }

    /**
     * 二堆叉结构的右子节点
     */
    public get right(): RoadNode {
        return this._right;
    }

    public set right(value: RoadNode) {
        this._right = value;
    }

    /**
     * 是否在开启列表标记
     */
    public get openTag(): number {
        return this._openTag;
    }

    public set openTag(value: number) {
        this._openTag = value;
    }

    /**
     * 是否在关闭列表标记
     */
    public get closeTag(): number {
        return this._closeTag;
    }

    public set closeTag(value: number) {
        this._closeTag = value;
    }

}
