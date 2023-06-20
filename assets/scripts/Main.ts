/*
 * @Descripttion: 主入口
 * @Author: CYK
 * @Date: 2022-05-13 09:40:14
 */
import { _decorator, Component, sys } from 'cc';
import { BaseUT } from './framework/base/BaseUtil';
import { SceneMgr } from './framework/mgr/SceneMgr';
import { TickMgr } from './framework/mgr/TickMgr';
import { MapEditorScene } from './modules/mapEditor/MapEditorScene';
import { MapMgr } from './modules/base/MapMgr';
const { ccclass } = _decorator;

@ccclass('Main')
export class Main extends Component {
    onLoad() {
        //转成全部变量，可在浏览器console直接输出
        globalThis.BaseUT = BaseUT;
        globalThis.MapMgr = MapMgr;
        TickMgr.inst.mainNode = this;
        console.log('系统相关环境变量: ');
        console.log(sys);
        SceneMgr.inst.run(MapEditorScene, { name: '测试数据' });
    }


    update(dt: number) {
        TickMgr.inst.onTick(dt);
    }
}

