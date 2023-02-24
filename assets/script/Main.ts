/*
 * @Descripttion: 主入口
 * @Author: CYK
 * @Date: 2022-05-13 09:40:14
 */
import { _decorator, Component, Prefab, Node, EventTouch, instantiate } from 'cc';
import { BaseEnum } from './framework/base/BaseEnum';
import { BaseUT } from './framework/base/BaseUtil';
import { scaleMode } from './framework/base/ScaleMode';
import { ResMgr } from './framework/mgr/ResMgr';
import { SceneMgr } from './framework/mgr/SceneMgr';
import { SoundMgr } from './framework/mgr/SoundMgr';
import { TickMgr } from './framework/mgr/TickMgr';
import { Sp } from './framework/uiComp/Sp';
import { MapEditorScene } from './modules/mapEditor/MapEditorScene';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    @property({ type: Prefab, tooltip: '点击特效' })
    clickEff: Prefab;
    onLoad() {
        // SoundMgr.inst.defaultBgMusic = "dy/sound/bg00";//设置默认背景音乐
        SceneMgr.inst.mainScene = 'MapEditorScene';//设置主场景
        SoundMgr.inst.buttonSound = "dy/sound/click";//设置全局按钮点击音效
        TickMgr.inst.mainNode = this;
        ResMgr.inst.setGlobal(
            'dy/sp/click',  
            'dy/sound/click',
            'ui/common'
        )
        scaleMode.designWidth = 1550;
        scaleMode.designHeight = 1000;
        scaleMode.designHeight_min = 1000;
        scaleMode.designHeight_max = 1000;

        // this.initClickEffContainer();
        SceneMgr.inst.run(MapEditorScene, { name: '红红火火恍恍惚惚' });
    }

    private initClickEffContainer() {
        let self = this;
        let newNode = BaseUT.newUINode('ClickEff');
        newNode.on(Node.EventType.TOUCH_START, self.touchHandler, self);
        newNode.on(Node.EventType.TOUCH_MOVE, self.touchHandler, self);
        newNode.on(Node.EventType.TOUCH_END, self.onStageCLick, self);
        let windowSize = BaseUT.getStageSize();
        BaseUT.setSize(newNode, windowSize.width, windowSize.height);
        SceneMgr.inst.getCanvas().addChild(newNode);
    }

    private touchHandler(e: EventTouch){
        e.preventSwallow = true;
    }

    private onStageCLick(event: EventTouch) {
        event.preventSwallow = true;
        let point = event.getUILocation();
        let eff = instantiate(this.clickEff);
        let sp = eff.getComponent(Sp);
        sp.node.on(BaseEnum.Game.onSpPlayEnd, () => {
            sp.node.destroy();
        }, this);
        sp.url = 'dy/sp/click';
        sp.playCount = 1;
        sp.frameRate = 40;
        let parent = SceneMgr.inst.getCanvas().getChildByName('ClickEff');
        let parnetSize = BaseUT.getSize(parent);
        eff.setPosition(point.x - parnetSize.width / 2, point.y - parnetSize.height / 2);
        parent.addChild(eff);
    }

    update(dt: number) {
        TickMgr.inst.onTick(dt);
    }
}

