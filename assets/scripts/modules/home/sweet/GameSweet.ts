import { _decorator, Component, Node } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
import { CONST } from '../../base/CONST';
import { SweetLayer } from './SweetLayer';
const { ccclass, property } = _decorator;

/*
 * @Descripttion: 甜品基础脚本
 * @Author: CYK
 * @Date: 2023-03-26 20:30:45
 */
@ccclass('GameSweet')
export class GameSweet extends UIComp {
  
    private _x: number;
    public get x(){
        return this._x;
    }
    public set x(value: number){
        this._x = value;
    }

    private _y: number;
    public get y(){
        return this._y;
    }
    public set y(value: number){
        this._y = value;
    }

    private _type: CONST.SweetType;
    public get type (){
        return this._type;
    }

    private _gameMgr: SweetLayer;
    public init(_x:number,_y:number,_type:CONST.SweetType,_gameMgr:SweetLayer){
        let self = this;
        self.x = _x;
        self.y = _y;
        self._type = _type;
        self._gameMgr = _gameMgr;
    }
}

