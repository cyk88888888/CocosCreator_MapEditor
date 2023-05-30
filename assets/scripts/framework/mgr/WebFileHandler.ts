import { ImageAsset, SpriteFrame, Texture2D, assetManager, sys } from "cc";

export default class WebFileHandler {
    private _fileInput: HTMLInputElement;
    private loadComplete: Function;
    private fileType: number;//文件类型，0图片，1文本, 2文件夹
    private file: File;
    private static _inst: WebFileHandler;
    public static get inst() {
        if (!this._inst) {
            this._inst = new WebFileHandler();
        }
        return this._inst;
    }

    constructor() {
        this.loadComplete = null;
        this.file = null;
        this.fileType = 0;
    }

    private init() {
        let self = this;
        self._fileInput = document.createElement("input");
        self._fileInput.id = "finput";
        self._fileInput.style.opacity = '0';
        self._fileInput.style.position = 'absolute';
        self._fileInput.setAttribute('left', '-999px');
        document.body.insertBefore(self._fileInput, document.body.firstChild);
        self._fileInput.onchange = (e: Event) => {
            self.onSelectFile(e);
            self.rmFileInput();
        }
        self._fileInput.oncancel = (e: Event) => {
            console.log(e);
            alert("用户取消了操作！");
            self.rmFileInput();
        }
    }

    private rmFileInput(){
        let self = this;
        if(self._fileInput){
            document.body.removeChild(self._fileInput);
            self._fileInput = null;
        }
    }

    //选中图片文件
    public openImageWin(cb: Function) {
        let self = this;
        self.init();
        self.fileType = 0;
        self._fileInput.type = "file";
        self._fileInput.accept = "image/png,image/jpeg";//"image/*"
        self.loadComplete = cb;
        self._fileInput.click();
    }

    //选中文本文件
    public openTextWin(cb: Function) {
        let self = this;
        self.init();
        self.fileType = 1;
        self._fileInput.type = "file";
        self._fileInput.accept = "application/json";
        self.loadComplete = cb;
        self._fileInput.click();
    }

    //选中目录文件夹
    public openDirectoryWin(cb: Function) {
        let self = this;
        self.init();
        self.fileType = 3;
        self._fileInput.type = "file";
        self._fileInput.accept = ".*";
        self.loadComplete = cb;
        self._fileInput.click();
    }

    private onSelectFile(t: any) {
        let self = this;
        self.file = t.target.files[0];
        if (self.fileType == 0) {//图片
            let url = self.createObjectURL(self.file);
            if (url) self.loadLocalImg(url);
        } else if (self.fileType == 1) {//文本
            self.loadLocalText(self.file);
        } else {//文件夹目录
            //todo...
        }
    }

    private loadLocalImg(url: string) {
        let self = this;
        assetManager.loadRemote<ImageAsset>(url, { ext: '.png' }, function (err, imageAsset) {
            const spriteFrame = new SpriteFrame();
            const texture = new Texture2D();
            texture.image = imageAsset;
            spriteFrame.texture = texture;
            self.loadComplete && self.loadComplete(spriteFrame, self.file);
        });
    }

    private loadLocalText(file: File) {
        let self = this;
        if (!file) return;
        let reader = new FileReader();
        reader.readAsText(file, "utf-8");
        reader.onprogress = (e: ProgressEvent) => {
            console.log("pg =", e.loaded);
        }
        reader.onload = function () {
            self.loadComplete && self.loadComplete(reader.result, self.file);
        }
    }

    /**
    * 保存数据到本地
    * @param {*} textToWrite       要保存的文件内容
    * @param {*} fileNameToSaveAs  要保存的文件名
    */
    public saveForBrowser(textToWrite: BlobPart, fileNameToSaveAs: string) {
        let self = this;
        if (sys.isBrowser) {
            console.log("浏览器");
            let textFileAsBlob = new Blob([textToWrite], { type: 'application/json' });
            let downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download File";
            let url = self.createObjectURL(textFileAsBlob);
            downloadLink.href = url;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            if (url) URL.revokeObjectURL(url);
        }
    }

    private createObjectURL(obj: Blob | MediaSource) {
        if (!obj) return null;
        return null != window.URL ? window.URL.createObjectURL(obj) : window.webkitURL.createObjectURL(obj);
    }
}