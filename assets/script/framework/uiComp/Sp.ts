/*
 * @Descripttion: sp序列帧图片播放器
 * @Author: CYK
 * @Date: 2022-06-24 14:49:32
 */
import { _decorator, Component, Sprite, SpriteFrame, SpriteAtlas, CCInteger, CCString } from 'cc';
import { BaseEnum } from '../base/BaseEnum';
import { emmiter } from '../base/Emmiter';
import { ResMgr } from '../mgr/ResMgr';
const { ccclass, property } = _decorator;

@ccclass('Sp')
export class Sp extends Component {
    @property({ tooltip: '是否自动播放' })
    public autoPlay: boolean = true;
    @property({ tooltip: '播放帧频', type: CCInteger })
    public frameRate: number = 24;
    @property({ tooltip: '播放次数,-1表示循环播放', type: CCInteger })
    public playCount: number = -1;
    @property({ tooltip: '资源路径'})
    public url: string = '';
    private _sprite: Sprite;
    private _url: string;
    private _spriteFrames: SpriteFrame[];
    /**当前播放的持续帧数 */
    private _curPlayFrame: number = 0;
    /**当前已播放次数 */
    private _playCount: number = 0;
    /** 是否暂停 */
    private _isStop: boolean;
    /**是否加载完毕 */
    private _loadCompleted: boolean;

    private _intervalTime: number;
    onLoad() {
        let self = this;
        self._sprite = self.node.getComponent(Sprite);
        if (!self._sprite) self._sprite = self.node.addComponent(Sprite);
        if (self.url != '') {
            self.setUrl(self.url);
            if (self.autoPlay) self.play(self.playCount);
        }
    }

    /**
     * 设置资源路径
     * @param value 资源路径
     * @returns 
     */
    public setUrl(value: string) {
        let self = this;
        if (self._url == value) return;
        self._url = value;
    }

    /**
     * 播放序列帧图片
     * @param count 播放次数：-1表示循环播放
     */
    public play(count: number = -1) {
        let self = this;
        if (!self._url) {
            console.error('请先设置资源路径！！！');
            return;
        }
        self._playCount = 0;
        self._curPlayFrame = 0;
        self.playCount = count;
        self._isStop = false;
        let spriteAtlas = <SpriteAtlas>ResMgr.inst.get(self._url);
        if (!spriteAtlas) {
            ResMgr.inst.loadWithoutJuHua(self._url, function () {
                loadComplete();
            }, self);
        } else {
            loadComplete();
        }

        function loadComplete() {
            let spriteAtlas = <SpriteAtlas>ResMgr.inst.get(self._url);
            self._spriteFrames = spriteAtlas.getSpriteFrames();
            self._loadCompleted = true;
            self.doInterval();
        }
    }

    public stop() {
        let self = this;
        self._isStop = true;
    }

    private doInterval() {
        let self = this;
        clearInterval(self._intervalTime);
        if (self.checkClearInterval()) return;
        let time = 1000 / self.frameRate;
        onInterVal();
        self._intervalTime = setInterval(() => {
            onInterVal();
        }, time);
        function onInterVal() {
            if (self.checkClearInterval()) return;
            let totSpriteFrameLen = self._spriteFrames.length;
            let idx = self._curPlayFrame;
            if (idx == totSpriteFrameLen - 1) {//全部播放结束一次
                self._curPlayFrame = -1;
                if (self.playCount != -1) {
                    self._playCount++;
                    if(self._playCount == self.playCount) self.node.emit(BaseEnum.Game.onSpPlayEnd);
                }
            }
            // console.log('self._spriteFrames[idx]:' + self._spriteFrames[idx].name);
            if (self._sprite) self._sprite.spriteFrame = self._spriteFrames[idx];

            self._curPlayFrame++;
        }
    }

    private checkClearInterval() {
        let self = this;
        if (!self.node || self._isStop || !self._loadCompleted || (self.playCount != -1 && self.playCount == self._playCount)) {
            clearInterval(self._intervalTime);
            return true;
        }
        return false;
    }

    onEnable() {
        let self = this;
        self.doInterval();
    }

    onDisable() {
        let self = this;
        clearInterval(self._intervalTime);
    }

    onDestroy() {
        let self = this;
        clearInterval(self._intervalTime);
    }
}

