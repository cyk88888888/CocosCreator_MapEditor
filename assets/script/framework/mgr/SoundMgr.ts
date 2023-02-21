/*
 * @Description: 音效管理器
 * @Author: CYK
 * @Date: 2022-05-23 09:27:58
 */
import { director, AudioClip, Node, AudioSource } from "cc";
import { ResMgr } from "./ResMgr";
import { SceneMgr } from "./SceneMgr";
export class SoundMgr {
    private static _inst: SoundMgr;
    public static get inst() {
        if (!this._inst) {
            this._inst = new SoundMgr();
        }
        return this._inst;
    }
    /**按钮点击音效 */
    public buttonSound: string;
    /**音乐缓存最大个数 */
    public musicCacheMaxCount: number = 5;
    public musicCachePool: string[] = [];
    private _defaultBgMusic: string;
    public get defaultBgMusic() {
        return this._defaultBgMusic;
    }
    /**设置默认背景音乐 */
    public set defaultBgMusic(value: string) {
        this._defaultBgMusic = value;
        this.playMainBg();
    }
    public curBgMusic: string;

    /**播放默认背景音乐 */
    public playMainBg() {
        if (!this.defaultBgMusic) return;
        this.playBg(this.defaultBgMusic);
    }

    /**播放背景音乐 */
    public playBg(url: string) {
        let self = this;
        if (self.curBgMusic == url) return;
        self.curBgMusic = url;
        let audioSource = this.bgAudioSource;
        ResMgr.inst.loadToWithoutJuHua('global', url, () => {
            let audioClip = ResMgr.inst.get(url) as AudioClip;
            if (self.curBgMusic != url || !audioClip) return;//加载完成的不是最后一次赋值的值
            audioSource.stop();
            audioSource.clip = audioClip;
            audioSource.loop = true;
            audioSource.play();
            if (self.musicCachePool.indexOf(url) == -1) self.musicCachePool.push(url);
            self.checkRealseMusic();
        }, self)
    }

    /**停止背景音乐 */
    public stopBg() {
        this.bgAudioSource.stop();
    }

    /**暂停背景音乐 */
    public pauseBg() {
        this.bgAudioSource.pause();
    }

    /**恢复背景音乐 */
    public recoverBg() {
        this.bgAudioSource.play();
    }

    private _audioSource: AudioSource;
    public get bgAudioSource() {
        if (!this._audioSource) {
            let mainNode = director.getScene().getChildByName('Main');
            this._audioSource = mainNode.getComponent(AudioSource);
        }
        return this._audioSource;
    }

    /**
     * 播放音效
     * @param url 音效资源路径
     * @param isLoop 是否循环 
     */
    public playSound(url: string, loop?: boolean) {
        let self = this;
        let canvas = SceneMgr.inst.getCanvas();
        let audioSource = canvas.getComponent(AudioSource);
        if(!canvas.getComponent(AudioSource)){
            audioSource = <AudioSource>canvas.addComponent(AudioSource);
        }
        ResMgr.inst.loadWithoutJuHua(url, () => {
            let audioClip = ResMgr.inst.get(url) as AudioClip;
            if (!audioClip) throw '音效资源不存在: ' + url;
            audioSource.loop = loop;
            audioSource.clip = audioClip;
            loop ? audioSource.play() : audioSource.playOneShot(audioClip);
            if (self.musicCachePool.indexOf(url) == -1) self.musicCachePool.push(url);
            self.checkRealseMusic();
        }, self)
    }

    /**检测释放音效资源 */
    private checkRealseMusic() {
        let self = this;
        if (self.musicCachePool.length > self.musicCacheMaxCount) {
            let shiftUrl = self.musicCachePool.shift();
            ResMgr.inst.releaseRes(shiftUrl);
        }
    }

    /**播放点击音效 */
    public playClickSound(){
        if(!this.buttonSound){
            console.warn('请先设置buttonSound点击音效资源路径');
            return;
        }
        this.playSound(this.buttonSound);
    }
}

