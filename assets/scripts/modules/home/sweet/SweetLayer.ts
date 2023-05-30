
import { _decorator, Component, Node, ProgressBar, Button, Label, UITransform, Prefab, instantiate, Vec2, Vec3, Enum } from 'cc';
import { SoundMgr } from '../../../framework/mgr/SoundMgr';
import { TickMgr } from '../../../framework/mgr/TickMgr';
import { UILayer } from '../../../framework/ui/UILayer';
import { CONST } from '../../base/CONST';
import { GameSweet } from './GameSweet';
const { ccclass, property } = _decorator;

/*
 * @Descripttion: 甜品消消乐界面
 * @Author: CYK
 * @Date: 2022-05-16 09:18:45
 */
@ccclass('SweetLayer')
export class SweetLayer extends UILayer {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/home/SweetLayer';
    @property({ type: Node })
    public grp_grid: Node;
    @property({ type: Node })
    public grp_sweet: Node;
    @property({ type: Prefab })
    public gridPrefab: Prefab;

    @property({type: [Prefab] }) 
    sweetPrefabs: Prefab[]=[];


    private _sweetPrefabMap:{[key: number]: Prefab};
    private _sweets: {[posKey: string]: GameSweet};;
    private _gridPos: {[posKey: string]: Vec3};
    protected onEnter() {
        SoundMgr.inst.playBg('dy/sound/anime_05_loop');
    }

    protected onFirstEnter() {
        let self = this;
        let sweetTypes = [CONST.SweetType.NORMAL];
        self._gridPos = {};
        self._sweetPrefabMap = {};
        self._sweets = {};
        for(let i = 0; i < self.sweetPrefabs.length; i++){
            self._sweetPrefabMap[sweetTypes[i]] = self.sweetPrefabs[i];
        }
        TickMgr.inst.nextTick(() => {
            self.initGrid();
        }, this)
    }

    private initGrid() {
        let self = this;
        let screenWh = self.screenWh;
        let width = screenWh[0];
        let height = screenWh[1];
        let gridW = 80, gridH = 78;
        let numCols = Math.floor(width / gridW);
        let numRows = Math.floor(height / gridH);
        for (let i = 0; i < numCols; i++) {
            for (let j = 0; j < numRows; j++) {
                let pos = new Vec3(-width/2 + (i+1)*gridW/2 + i * gridW / 2, height/2 - (j+1)*gridH/2 - j * gridH / 2);
                let grid = instantiate(self.gridPrefab);
                grid.setParent(self.grp_grid);
                grid.setPosition(pos);

                let sweet = instantiate(self._sweetPrefabMap[CONST.SweetType.NORMAL]);
                sweet.setParent(self.grp_sweet);
                sweet.setPosition(pos);
                let gameSweet = sweet.getComponent(GameSweet);
                gameSweet.init(i,j,CONST.SweetType.NORMAL, self);
                self._sweets[i+"_"+j] = gameSweet;

                self._gridPos[i+"_"+j] = pos;
            }
        }
    }

    private get screenWh() {
        let self = this;
        let transform = self.grp_grid.getComponent(UITransform);
        return [transform.contentSize.width, transform.contentSize.height];
    }

    protected onExit(): void {
        SoundMgr.inst.playMainBg();
    }
}

