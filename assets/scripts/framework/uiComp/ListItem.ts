/******************************************
 * @author kL <klk0@qq.com>
 * @date 2019/12/9
 * @doc 列表Item组件.
 * 说明：
 *      1、此组件须配合List组件使用。（配套的配套的..）
 * @end
 ******************************************/

import { Node, Component, Enum, Sprite, SpriteFrame, tween, _decorator, EventHandler, Tween, Button, UITransform, Vec3, EventTouch, js } from 'cc';
import { DEV } from 'cc/env';
import { ButtonPlus } from './ButtonPlus';
import { emmiter } from '../base/Emmiter';
import { SoundMgr } from '../mgr/SoundMgr';
const { ccclass, property, disallowMultiple, executionOrder } = _decorator;

export enum SelectedType_ListItem {
    NONE = 0,
    TOGGLE = 1,
    SWITCH = 2,
}

@ccclass("ListItem")
@disallowMultiple()
@executionOrder(-5001) //先于List
export class ListItem extends Component {
    //图标 
    @property({ type: Sprite, tooltip: DEV && '图标' })
    icon: Sprite = null;
    //标题
    @property({ type: Node, tooltip: DEV && '标题' })
    title: Node = null;
    //选择模式
    @property({
        type: Enum(SelectedType_ListItem),
        tooltip: DEV && '选择模式'
    })
    selectedMode: SelectedType_ListItem = SelectedType_ListItem.NONE;
    //被选标志
    @property({
        type: Node, tooltip: DEV && '被选标识',
        visible() { return this.selectedMode > SelectedType_ListItem.NONE }
    })
    selectedFlag: Node = null;
    //被选择的SpriteFrame
    @property({
        type: SpriteFrame, tooltip: DEV && '被选择的SpriteFrame',
        visible() { return this.selectedMode == SelectedType_ListItem.SWITCH }
    })
    selectedSpriteFrame: SpriteFrame = null;
    //未被选择的SpriteFrame
    private _unselectedSpriteFrame: SpriteFrame = null;
    //自适应尺寸
    @property({
        tooltip: DEV && '自适应尺寸（宽或高）',
    })
    adaptiveSize: boolean = false;

    //选择
    private _selected: boolean = false;
    public set selected(val: boolean) {
        this._selected = val;
        if (!this.selectedFlag)
            return;
        switch (this.selectedMode) {
            case SelectedType_ListItem.TOGGLE:
                this.selectedFlag.active = val;
                break;
            case SelectedType_ListItem.SWITCH:
                let sp: Sprite = this.selectedFlag.getComponent(Sprite);
                if (sp) {
                    sp.spriteFrame = val ? this.selectedSpriteFrame : this._unselectedSpriteFrame;
                }
                break;
        }
    }
    public get selected() {
        return this._selected;
    }
    //按钮组件
    private _btnCom: Button;
    public get btnCom() {
        if (!this._btnCom)
            this._btnCom = this.node.getComponent(Button) || this.node.getComponent(ButtonPlus);
        return this._btnCom;
    }
    //依赖的List组件
    public list: any;
    //是否已经注册过事件
    private _eventReg = false;
    //序列id
    public listId: number;


    private _emmitMap: { [event: string]: Function };//已注册的监听事件列表
    private _objTapMap: { [objName: string]: Node };//已添加的显示对象点击事件的记录
    private _tweenTargetList: any[];//已添加缓动的对象列表
    public data: any;
    private isFirstEnter: boolean = true;
    /** 预制体路径 */
    public static prefabUrl: string = '';
    public hasDestory: boolean;//是否已被销毁
    /** 脚本类名**/
    public scriptName: string;
    protected needRefreshListOnEnter: boolean = true;

    __preload() {
        let self = this;
        self.ctor_b();
        self.ctor();
        self.ctor_a();
    }

    onLoad() {
        this.scriptName = js.getClassName(this);
        // console.log('onLoad: ' + this.scriptName);
        // //没有按钮组件的话，selectedFlag无效
        // if (!this.btnCom)
        //     this.selectedMode == SelectedType.NONE;
        //有选择模式时，保存相应的东西
        if (this.selectedMode == SelectedType_ListItem.SWITCH) {
            let com: Sprite = this.selectedFlag.getComponent(Sprite);
            this._unselectedSpriteFrame = com.spriteFrame;
        }
    }

    onEnable() {
        let self = this;
        self.__doEnter();
    }

    onDisable() {
        let self = this;
        self.__dispose();
    }

    protected ctor_b() { }

    protected ctor() { }

    protected ctor_a() { }

    protected onEnter_b() { }

    protected onEnter() { }

    protected onFirstEnter() { }

    protected onEnter_a() { }

    protected dchg_b() { }

    protected dchg() { }

    protected dchg_a() { }

    protected onExit_b() { }

    protected onExit() { }

    protected onExit_a() { }

    protected onEmitter(event: string, listener: any) {
        let self = this;
        emmiter.on(event, listener, self);
        if (!self._emmitMap) self._emmitMap = {};
        self._emmitMap[event] = listener;
    }

    protected unEmitter(event: string, listener: any) {
        let self = this;
        emmiter.off(event, listener, self);
    }

    protected emit(event: string, data?: any) {
        emmiter.emit(event, data)
    }

    public static get __className(): string {
        return js.getClassName(this);
    }

    public setData(data: any) {
        let self = this;
        if (self.data != data) {
            self.data = data;
            self.dchg_b();
            self.dchg();
            self.dchg_a();
        }
    }

    /**
     * 初始化view
     */
    private __doEnter() {
        let self = this;
        if (self.hasDestory) return;
        self.addListener();
        // console.log('进入' + self.scriptName);
        self.onEnter_b();
        self.onEnter();
        if (self.isFirstEnter) {
            self.isFirstEnter = false;
            self.onFirstEnter();
        }
        self.onEnter_a();
        self.refreshAllList();
    }

    /**添加事件监听**/
    private addListener() {
        let self = this;
        self._objTapMap = {};
        for (let objName in self) {
            let obj = self[objName];
            if (!obj) continue;
            let eventFuncName = "_tap_" + objName;
            if (self[eventFuncName] && (obj instanceof Component || obj instanceof Node)) {
                let eventName = Node.EventType.TOUCH_END;
                let node = obj instanceof Component ? obj.node : obj;
                node.on(eventName, self.onNodeClick, self);
                self._objTapMap[eventFuncName + '&' + eventName] = node;
            }
        }
    }

    private onNodeClick(event: EventTouch) {
        let self = this;
        SoundMgr.inst.playClickSound();
        let eventFuncName = "_tap_" + event.currentTarget.name;
        self[eventFuncName](event);
    }

    /**刷新所有列表 */
    private refreshAllList() {
        let self = this;
        if (!self.needRefreshListOnEnter) return;
        for (let objName in self) {
            let obj = self[objName];
            if (!obj) continue;
            let dataFunc = "_data_" + objName;
            if (self[dataFunc]) {
                self.refreshList(objName);
            }
        }
    }

    /** 刷新指定列表*/
    protected refreshList(id: string) {
        let self = this;
        let listNode: Node = self[id];
        if (!listNode) return console.warn(`找不到id为${id}的列表`);
        let list = listNode.getComponent('List');
        if (!list) return console.warn(`列表${id}没有绑定List脚本`);
        list['nodeName'] = id;
        let renderEvent = list['renderEvent'];
        renderEvent.target = self.node;
        renderEvent.component = self.scriptName;
        renderEvent.handler = '__onListRender';

        let selectedMode = list['selectedMode'];
        if (selectedMode != 0) {//SelectedType_List.NONE
            let selectedEvent = list['selectedEvent'];
            selectedEvent.target = self.node;
            selectedEvent.component = self.scriptName;
            selectedEvent.handler = '__onSelectEvent';
        }

        if (list['slideMode'] == 3) {//SlideType.PAGE
            let pageChangeEvent = list['pageChangeEvent'];
            pageChangeEvent.target = self.node;
            pageChangeEvent.component = self.scriptName;
            pageChangeEvent.handler = '__onPageChangeEvent';
        }

        let dataList = self['_data_' + id]();
        list['dataList'] = dataList || [];
    }

    //列表项渲染
    private __onListRender(item: Node, idx: number) {
        let self = this;
        //刷新子项 todo...
        let listItem = item.getComponent(ListItem);
        let list = listItem.list;
        let itemData = list.dataList[idx];
        // console.log(itemData);
        listItem.setData(itemData);
    }

    //列表项被选中
    private __onSelectEvent(item: Node, selectedIdx: number, lastSelectedIdx: number, val: number) {
        let self = this;
        let listItem = item.getComponent(ListItem);
        let listName = listItem.list['nodeName'];
        if (self["_select_" + listName]) {
            self["_select_" + listName](listItem.data, selectedIdx, lastSelectedIdx);
        }
    }

    private __onPageChangeEvent(list: any, pageNum: number) {
        let self = this;
        let listName = list['nodeName'];
        if (self["_pageChange_" + listName]) {
            self["_pageChange_" + listName](pageNum);
        }
    }

    /**获取指定对象的缓动Tweener */
    protected getTween(target: Node): Tween<Node> {
        if (!this._tweenTargetList) {
            this._tweenTargetList = [];
        }
        if (this._tweenTargetList.indexOf(target) == -1) this._tweenTargetList.push(target);
        return tween(target);
    }

    /**清除指定对象的缓动Tweener */
    protected rmTween(target: Node) {
        Tween.stopAllByTarget(target);
    }

    /**清除所有对象的缓动 */
    private rmAllTweens() {
        if (this._tweenTargetList) {
            for (let i = 0; i < this._tweenTargetList.length; i++) {
                this.rmTween(this._tweenTargetList[i]);
            }
        }
        this._tweenTargetList = null;
    }

    private timeoutIdArr: number[];
    protected setTimeout(cb: () => void, timeout: number) {
        if (!this.timeoutIdArr) this.timeoutIdArr = [];
        let timeoutId = setTimeout(() => {
            cb.call(this);
        }, timeout);
        this.timeoutIdArr.push(timeoutId);
        return timeoutId;
    }

    private intervalIdArr: number[];
    protected setInterval(cb: () => void, timeout: number) {
        if (!this.intervalIdArr) this.intervalIdArr = [];
        let intervalId = setInterval(() => {
            cb.call(this);
        }, timeout);
        this.intervalIdArr.push(intervalId);
        return intervalId;
    }

    /**
     * 清除所有的setTimeout和setInterval定时器
     */
    protected clearAllTimeoutOrInterval() {
        let self = this;
        if (self.timeoutIdArr) {
            for (let i = 0; i < self.timeoutIdArr.length; i++) {
                clearTimeout(self.timeoutIdArr[i]);
            }
            self.timeoutIdArr = null;
            console.log('清除timeoutIdArr: ' + self.scriptName);
        }

        if (self.intervalIdArr) {
            for (let i = 0; i < self.intervalIdArr.length; i++) {
                clearInterval(self.intervalIdArr[i]);
            }
            self.intervalIdArr = null;
            console.log('清除intervalIdArr: ' + self.scriptName);
        }
    }

    protected destory() {
        let self = this;
        if (self.hasDestory) return;
        self.node.destroy();
        self.hasDestory = true;
    }

    private __dispose() {
        let self = this;
        if (self._emmitMap) {
            for (let event in self._emmitMap) {
                self.unEmitter(event, self._emmitMap[event]);
            }
            self._emmitMap = null;
        }

        if (self._objTapMap) {
            for (let key in self._objTapMap) {
                let splitKey = key.split('&');
                let eventFuncName = splitKey[0];
                let eventName = splitKey[1];
                let obj = self._objTapMap[key];
                obj.off(eventName, self.onNodeClick, self);
            }
            self._objTapMap = null;
        }

        self.clearAllTimeoutOrInterval();
        self.rmAllTweens();

        // console.log('退出' + self.scriptName);
        self.onExit_b();
        self.onExit();
        self.onExit_a();
    }

    public registerEvent() {
        if (!this._eventReg) {
            if (this.btnCom && this.list.selectedMode > 0) {
                this.btnCom.clickEvents.unshift(this.createEvt(this, 'onClickThis'));
            }
            if (this.adaptiveSize) {
                this.node.on(Node.EventType.SIZE_CHANGED, this.onSizeChange, this);
            }
            this._eventReg = true;
        }
    }

    private onSizeChange() {
        this.list._onItemAdaptive(this.node);
    }
    /**
     * 创建事件
     * @param {cc.Component} component 组件脚本
     * @param {string} handlerName 触发函数名称
     * @param {cc.Node} node 组件所在node（不传的情况下取component.node）
     * @returns cc.Component.EventHandler
     */
    private createEvt(component: Component, handlerName: string, node: Node = null) {
        if (!component.isValid)
            return;//有些异步加载的，节点以及销毁了。
        component['comName'] = component['comName'] || js.getClassName(component); 
        let evt = new EventHandler();
        evt.target = node || component.node;
        evt.component = component['comName'];
        evt.handler = handlerName;
        return evt;
    }

    public showAni(aniType: number, callFunc: Function, del: boolean) {
        let self = this;
        let twe: Tween<Node>;
        let ut: UITransform = self.node.getComponent(UITransform);
        switch (aniType) {
            case 0: //向上消失
                twe = self.getTween(self.node)
                    .to(.2, { scale: new Vec3(.7, .7) })
                    .by(.3, { position: new Vec3(0, ut.height * 2) });
                break;
            case 1: //向右消失
                twe = self.getTween(self.node)
                    .to(.2, { scale: new Vec3(.7, .7) })
                    .by(.3, { position: new Vec3(ut.width * 2, 0) });
                break;
            case 2: //向下消失
                twe = self.getTween(self.node)
                    .to(.2, { scale: new Vec3(.7, .7) })
                    .by(.3, { position: new Vec3(0, ut.height * -2) });
                break;
            case 3: //向左消失
                twe = self.getTween(self.node)
                    .to(.2, { scale: new Vec3(.7, .7) })
                    .by(.3, { position: new Vec3(ut.width * -2, 0) });
                break;
            default: //默认：缩小消失
                twe = self.getTween(self.node)
                    .to(.3, { scale: new Vec3(.1, .1) });
                break;
        }

        if (callFunc || del) {
            twe.call(() => {
                if (del) {
                    self.list._delSingleItem(self.node);
                    for (let n: number = self.list.displayData.length - 1; n >= 0; n--) {
                        if (self.list.displayData[n].id == self.listId) {
                            self.list.displayData.splice(n, 1);
                            break;
                        }
                    }
                }
                callFunc();
            });
        }
        twe.start();
    }

    private onClickThis() {
        this.list.selectedId = this.listId;
    }

    onDestroy() {
        this.node.off(Node.EventType.SIZE_CHANGED, this.onSizeChange, this);
    }

}
