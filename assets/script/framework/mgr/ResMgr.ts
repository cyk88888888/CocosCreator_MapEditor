/*
 * @Descripttion: 资源管理器
 * @Author: CYK
 * @Date: 2022-05-12 16:15:52
 */
import { Asset, assetManager, Prefab, resources, SpriteAtlas } from "cc";
import { JuHuaDlg } from "../../modules/common/JuHuaDlg";
import { LoadingScene } from "../../modules/loading/LoadingScene";
import { SceneMgr } from "./SceneMgr";

export class ResMgr {
    private static _inst: ResMgr;
    public static get inst() {
        if (!this._inst) {
            this._inst = new ResMgr();
            this._inst.moduleResMap = {};
        }
        return this._inst;
    }

    /**模块资源列表map */
    public moduleResMap: { [sceneName: string]: string[] };
    private _juHuaDlg: any;
    private closeJuHuaDlg() {
        if (this._juHuaDlg) {
            this._juHuaDlg.close();
            this._juHuaDlg = null;
        }
    }

    /**
     * 加载预制体 Prefab
     * @param path 预制体路径
     * @returns 
     */
    public async loadPrefab(prefabPath: string): Promise<Prefab> {
        return new Promise((resolve, reject) => {
            let cachePrefab = this.get(prefabPath);
            if (cachePrefab) {
                console.log('resName: ' + prefabPath + '加载完毕(缓存已有)');
                this.pushResNametoMap(prefabPath);
                return resolve(cachePrefab as Prefab);
            } else {
                resources.load(prefabPath, Prefab, (err, prefab) => {
                    if (!err) {
                        console.log('resName: ' + prefabPath + '加载完毕');
                        this.pushResNametoMap(prefabPath);
                        resolve(prefab);
                    } else {
                        console.log('resName: ' + prefabPath + '加载失败');
                        reject(err);
                    }
                });
            }
        })
    }

    private async _loadWithItor(res: string[] | string, itorCb?: Function, cb?: Function, ctx?: any, needJuHua: boolean = true, sceneName?: string) {
        let resList = typeof res === 'string' ? [res] : res;
        let totLen = resList.length;//待下载总个数
        let hasLoadResCount: number = 0;//已下载个数
        if (needJuHua) {
            let isAllLoaded = true;
            for (let i = 0; i < totLen; i++) {
                let resName = resList[i];
                if (!this.get(resName)) {
                    isAllLoaded = false;
                    break;
                }
            }
            if (!isAllLoaded && !this._juHuaDlg && SceneMgr.inst.curSceneName != LoadingScene.name) {
                this._juHuaDlg = await JuHuaDlg.show();
            }
        }

        let loadSucc = (resName: string, isFromCache?: boolean) => {
            hasLoadResCount++;
            console.log('resName: ' + resName + '加载完毕' + (isFromCache ? '(缓存已有)' : ''));
            this.pushResNametoMap(resName, sceneName);
            if (itorCb) itorCb.call(ctx, resName, hasLoadResCount);
            if (hasLoadResCount == totLen) {
                this.closeJuHuaDlg();
                if (cb) cb.call(ctx);
            }
        }

        for (let i = 0; i < totLen; i++) {
            let resName = resList[i];
            if (this.get(resName)) {//缓存已有
                loadSucc(resName, true);
            } else {
                resources.load(resName, Asset, (err: Error | null, asset: Asset) => {
                    if (!err) {
                        loadSucc(resName);
                    } else {
                        console.error(err);
                    }
                })

            }
        }
    }
    /**
     * 加载资源
     * @param res 资源列表
     * @param itorCb 单个资源加载完毕回调
     * @param cb 全部下载完成回调
     * @param ctx 
     */
    public loadWithItor(res: string[] | string, itorCb?: Function, cb?: Function, ctx?: any, needJuHua: boolean = true) {
        this._loadWithItor(res, itorCb, cb, ctx, needJuHua);
    }
    /**
      * 加载资源到指定模块
      * @param res 资源列表
      * @param itorCb 单个资源加载完毕回调
      * @param cb 全部下载完成回调
      * @param ctx 
      */
    public loadToWithItor(moduleName: string, res: string[] | string, itorCb?: Function, cb?: Function, ctx?: any, needJuHua: boolean = true) {
        this._loadWithItor(res, itorCb, cb, ctx, needJuHua, moduleName);
    }

    /**
    * 加载资源
    * @param resList 资源列表
    * @param cb 全部下载完成回调
    * @param ctx 
    */
    public load(resList: string[] | string, cb?: Function, ctx?: any) {
        this._loadWithItor(resList, null, cb, ctx);
    }

    /**
    * 加载资源到指定模块
    * @param resList 资源列表
    * @param cb 全部下载完成回调
    * @param ctx 
    */
    public loadTo(sceneName: string, resList: string[] | string, cb?: Function, ctx?: any) {
        this._loadWithItor(resList, null, cb, ctx, true, sceneName);
    }
    /**
     * 加载资源(无菊花模式)
     * @param resList 资源列表
     * @param cb 全部下载完成回调
     * @param ctx 
     */
    public loadWithoutJuHua(resList: string[] | string, cb?: Function, ctx?: any) {
        this._loadWithItor(resList, null, cb, ctx, false);
    }

    /**
     * 加载资源(无菊花模式)
     * @param resList 资源列表
     * @param cb 全部下载完成回调
     * @param ctx 
     */
    public loadToWithoutJuHua(sceneName: string, resList: string[] | string, cb?: Function, ctx?: any) {
        this._loadWithItor(resList, null, cb, ctx, false, sceneName);
    }

    /**获取已加载缓存的资源 */
    public get(resName: string) {
        return resources.get(resName);
    }
    /**
     * 释放资源
     * @param res 
     */
    public releaseRes(res: string | string[]) {
        let resList = typeof res === 'string' ? [res] : res;
        for (let i = 0; i < resList.length; i++) {
            let resName = resList[i];
            let cahceAsset = this.get(resName);
            if (!cahceAsset) continue;
            resources.release(resName);
            console.log('释放资源: ' + resName);
        }
    }

    /**释放模块资源 */
    public releaseResModule(scenename: string) {
        let allResList = [];
        let resList = this.moduleResMap[scenename];
        if (resList) {
            delete this.moduleResMap[scenename];
            allResList = allResList.concat(resList);
        }
        this.releaseRes(allResList);
    }

    private pushResNametoMap(resName: string, sceneName?: string) {
        let moduleName = sceneName ? sceneName : SceneMgr.inst.curSceneName;
        let globalRes = this.moduleResMap['global'] || [];
        let resList = this.moduleResMap[moduleName] = this.moduleResMap[moduleName] || [];
        if (globalRes.indexOf(resName) == -1 && resList.indexOf(resName) == -1) resList.push(resName);
    }

    /**设置对应资源为全局资源，避免被释放 */
    public setGlobal(...args: string[]) {
        for (let i = 0; i < args.length; i++) {
            this.pushResNametoMap(args[i], 'global');
        }
    }

}