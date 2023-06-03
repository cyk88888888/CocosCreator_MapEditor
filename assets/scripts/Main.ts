/*
 * @Descripttion: 主入口
 * @Author: CYK
 * @Date: 2022-05-13 09:40:14
 */
import { _decorator, Component, Prefab, Node, EventTouch, instantiate, sys } from 'cc';
import { BaseUT } from './framework/base/BaseUtil';
import { ResMgr } from './framework/mgr/ResMgr';
import { SceneMgr } from './framework/mgr/SceneMgr';
import { SoundMgr } from './framework/mgr/SoundMgr';
import { TickMgr } from './framework/mgr/TickMgr';
import { MapEditorScene } from './modules/mapEditor/MapEditorScene';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    onLoad() {
        //转成全部变量，可在浏览器console直接输出
        globalThis.BaseUT = BaseUT;
        SoundMgr.inst.defaultBgMusic = "dy/sound/lover";//设置默认背景音乐
        SceneMgr.inst.mainScene = 'HomeScene';//设置主场景
        SoundMgr.inst.buttonSound = "dy/sound/click";//设置全局按钮点击音效
        TickMgr.inst.mainNode = this;
        ResMgr.inst.setGlobal(
            'dy/sp/click',  
            'dy/sound/click',
            'ui/common'
        )
        console.log(sys);
        SceneMgr.inst.run(MapEditorScene, { name: '红红火火恍恍惚惚' });
    }


    update(dt: number) {
        TickMgr.inst.onTick(dt);
    }
}

