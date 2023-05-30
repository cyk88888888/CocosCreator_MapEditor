/*
 * @Descripttion: 场景管理器
 * @Author: CYK
 * @Date: 2022-05-16 09:18:45
 */
import { director, Node} from "cc";
import { BaseUT } from "../base/BaseUtil";
import { ModuleCfgInfo } from "../base/ModuleCfgInfo";
import { UIScene } from "../ui/UIScene";
import { moduleInfoMap } from "./ModuleMgr";
import { ResMgr } from "./ResMgr";

export class SceneMgr {
    private static _inst: SceneMgr;
    /**当前场景**/
    public curScene: UIScene;
    /**当前场景名称 */
    public curSceneName: string;
    /** 主场景名称*/
    public mainScene: string;
    private _popArr: UIScene[];
    private _canvas: Node;
    public static get inst() {
        if (!this._inst) {
            this._inst = new SceneMgr();
            this._inst._popArr = [];
        }
        return this._inst;
    }

    /**
     * 获取当前场景的canvas
     * @returns 
     */
    public getCanvas(): Node {
        if (!this._canvas) {
            this._canvas = director.getScene().getChildByName('Canvas');
        }
        return this._canvas;
    }

    /**
 * 获取UI的Camera
 * @returns 
 */
    public getUCamera(): Node {
        if (!this._canvas) {
            this._canvas = director.getScene().getChildByName('Canvas');
        }
        return this.getCanvas().getChildByName('UICamera');
    }

    /**打开场景（替换模式） */
    public run(scene: string | typeof UIScene, data?: any) {
        this.showScene(scene, data);
    }

    /**打开场景（入栈模式） */
    public push(scene: string | typeof UIScene, data?: any) {
        this.showScene(scene, data, true);
    }

    private showScene(scene: string | typeof UIScene, data?: any, toPush?: boolean) {
        let sceneName = typeof scene === 'string' ? scene : scene.name;
        if (this.curScene && this.curScene.className == sceneName) return;//相同场景
        let moduleInfo = moduleInfoMap[sceneName];
        if (!moduleInfo) {
            console.error('未注册模块：' + sceneName)
            return;
        }
        ResMgr.inst.curSceneName = this.curSceneName = sceneName;
        if (moduleInfo.preResList && moduleInfo.preResList.length > 0) {
            ResMgr.inst.loadTo(sceneName, moduleInfo.preResList, this.onUILoaded.bind(this, moduleInfo, data, toPush));
        } else {
            this.onUILoaded(moduleInfo, data, toPush);
        }

    }

    private onUILoaded(moduleInfo: ModuleCfgInfo, data: any, toPush: boolean) {
        if (toPush && this.curScene) {
            this._popArr.push(this.curScene);
            this.curScene.removeFromParent();
        } else {
            this.checkDestoryLastScene(!toPush);
        }
        let sceneName = moduleInfo.name;
        let newNode = BaseUT.newUINode(sceneName);
        let script = this.curScene = newNode.addComponent(sceneName) as UIScene;
        script.setData(data);
        script.addToGRoot();
    }

    /**判断销毁上个场景并释放资源 */
    private checkDestoryLastScene(destory?: boolean) {
        if (this.curScene) {
            if (destory) this.curScene.destory();
            let lastModuleInfo = moduleInfoMap[this.curScene.className];
            if (destory && !lastModuleInfo.cacheEnabled) {//销毁上个场景
                ResMgr.inst.releaseResModule(this.curScene.className);//释放场景资源
            }
        }
    }

    /** 返回到上个场景*/
    public pop() {
        let self = this;
        if (self._popArr.length <= 0) {
            console.error('已经pop到底了！！！！！！！');
            return;
        }
        self.checkDestoryLastScene(true);

        self.curScene = self._popArr.pop();
        ResMgr.inst.curSceneName = self.curSceneName = self.curScene.className;
        self.curScene.addToGRoot();
    }
}


