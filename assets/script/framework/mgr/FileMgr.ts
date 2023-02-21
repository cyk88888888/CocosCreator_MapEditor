/*
 * @Descripttion: 文件操作管理器
 * @Author: CYK
 * @Date: 2022-06-28 13:56:20
 */

import { sys } from "cc";
import { BaseEnum } from "../base/BaseEnum";

export class FileMgr {
    private static _inst: FileMgr;
    public static get inst() {
        if (!this._inst) {
            this._inst = new FileMgr();
        }
        return this._inst;
    }

    /**
     * 打开文件选择器
     *
     * @param {string} accept
     * @param {(file: File) => void} callback
     * @memberof FileMgr
     */
    openLocalFile(accept: string, callback: (file: File) => void) {
        let inputEl: HTMLInputElement = <HTMLInputElement>document.getElementById('file_input');
        if (!inputEl) {
            // console.log('xxxxxx createElement input');
            inputEl = document.createElement('input');
            inputEl.id = 'file_input';
            inputEl.setAttribute('id', 'file_input');
            inputEl.setAttribute('type', 'file');
            inputEl.setAttribute('class', 'fileToUpload');
            inputEl.style.opacity = '0';
            inputEl.style.position = 'absolute';
            inputEl.setAttribute('left', '-999px');
            document.body.appendChild(inputEl);
        }

        accept = accept || ".*";
        inputEl.setAttribute('accept', accept);

        // inputEl.addEventListener('change', (event) => {
        //     console.log('xxx onchange1', event, inputEl.value);
        // });
        inputEl.onchange = (event) => {
            // console.log('xxx onchange2', event, inputEl.files);
            let files = inputEl.files
            if (files && files.length > 0) {
                var file = files[0];
                if (callback) callback(file);
            }
        }
        inputEl.click();
    }

    /**
     * 读取本地文件数据
     *
     * @param {File} file
     * @param {READ_FILE_TYPE} readType
     * @param {((result: string | ArrayBuffer) => void)} callback
     * @memberof FileMgr
     */
    readLocalFile(file: File, readType: BaseEnum.READ_FILE_TYPE, callback: (result: string | ArrayBuffer) => void) {
        var reader = new FileReader();
        reader.onload = function (event) {
            if (callback) {
                if (reader.readyState == FileReader.DONE) {
                    // console.log('xxx FileReader', event, reader.result);
                    callback(reader.result);
                } else {
                    callback(null);
                }
            }
        };
        switch (readType) {
            case BaseEnum.READ_FILE_TYPE.DATA_URL:
                reader.readAsDataURL(file);
                break;
            case BaseEnum.READ_FILE_TYPE.TEXT:
                reader.readAsText(file);   //作为字符串读出
                //reader.readAsText(file,'gb2312');   //默认是用utf-8格式输出的，想指定输出格式就再添加一个参数，像txt的ANSI格式只能用国标才能显示出来
                break;
            case BaseEnum.READ_FILE_TYPE.BINARY:
                reader.readAsBinaryString(file);
                break;
            case BaseEnum.READ_FILE_TYPE.ARRAYBUFFER:
                reader.readAsArrayBuffer(file);
                break;
        }
    }

    /**
     * 保存数据到本地
     *
     * @param {*} textToWrite       要保存的文件内容
     * @param {*} fileNameToSaveAs  要保存的文件名
     * @memberof FileMgr
     */
    saveForBrowser(textToWrite, fileNameToSaveAs) {
        if (sys.isBrowser) {
            console.log("浏览器");
            let textFileAsBlob = new Blob([textToWrite], { type: 'application/json' });
            let downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download File";
            if (window.webkitURL != null) {
                // Chrome allows the link to be clicked            
                // without actually adding it to the DOM.            
                downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
            } else {
                // Firefox requires the link to be added to the DOM            
                // before it can be clicked.            
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                // downloadLink.onclick = destroyClickedElement;            
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
            }
            downloadLink.click();
        }
    }

}


