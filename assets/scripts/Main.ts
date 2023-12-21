/*
 * @Descripttion: 主入口
 * @Author: CYK
 * @Date: 2022-05-13 09:40:14
 */
import { _decorator, Component, director, EventTouch, Node, sys } from 'cc';
import { MapEditorScene } from './modules/mapEditor/MapEditorScene';
import { MapMgr } from './modules/base/MapMgr';
import { CONST } from './modules/base/CONST';
import { BaseUT } from '../../extensions/cocos-framework/src/base/BaseUtil';
import { TickMgr } from '../../extensions/cocos-framework/src/mgr/TickMgr';
import { SceneMgr } from '../../extensions/cocos-framework/src/mgr/SceneMgr';
import { emmiter } from '../../extensions/cocos-framework/src/base/Emmiter';
const { ccclass } = _decorator;

@ccclass('Main')
export class Main extends Component {
    onLoad() {
        //转成全部变量，可在浏览器console直接输出
        globalThis.BaseUT = BaseUT;
        globalThis.MapMgr = MapMgr;
        MapMgr.inst.version = '1.0.0';
        console.log('系统相关环境变量: ');
        console.log(sys);
        let self = this;
        let canvas = director.getScene().getChildByName('Canvas');
        canvas.on(Node.EventType.MOUSE_UP, self.onClickStage, self);
        SceneMgr.inst.run(MapEditorScene);
    }

    private onClickStage(event: EventTouch) {
        emmiter.emit(CONST.GEVT.ClickStage);
    }

    update(dt: number) {
        TickMgr.inst.onTick(dt);
    }
}

