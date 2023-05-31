import { MessageTip } from "../../modules/common/message/MessageTip";
import { JuHuaDlg } from "../ui/JuHuaDlg";

/*
 * @Descripttion: 文件IO处理器
 * @Author: CYK
 * @Date: 2022-06-28 13:56:20
 * 
 */
export class FileIOHandler {
    private static _inst: FileIOHandler;
    public static get inst() {
        if (!this._inst) {
            this._inst = new FileIOHandler();
        }
        return this._inst;
    }

    /**获取文件夹的树结构数据 */
    public async getDirTreeMap(): Promise<FileSystemDirectoryHandle | FileSystemFileHandle> {
        try {
            const directoryHandle: FileSystemDirectoryHandle = await window["showDirectoryPicker"]();
            const root = await getFilesRecursively(directoryHandle);
            return root;
        } catch {
            alert("用户取消授权读取文件内容");
        }

        async function getFilesRecursively(handle: FileSystemDirectoryHandle | FileSystemFileHandle) {
            if (handle.kind === "file") {
                handle.getFile();
                return handle;
            }
            handle["children"] = [];
            const iter = handle["entries"]();
            for await (const item of iter) {
                handle["children"].push(await getFilesRecursively(item[1]));
            }
            return handle;
        }
    }

    /** 读取本地文件内容*/
    public readLocalText(file: File, cb?: Function, errCb?: Function, ctx?: any) {
        if (!file) return;
        let reader = new FileReader();
        reader.readAsText(file, "utf-8");
        reader.onprogress = (e: ProgressEvent) => {
            console.log("pg =", e.loaded);
        }
        reader.onload = () => {
            cb && cb.call(ctx, reader.result);
        }
        reader.onerror = (ev: ProgressEvent) => {
            errCb && errCb.call(ctx, ev);
        }
    }

    /**保存文本到本地 */
    public async saveTextToLocal(data: string) {
        try {
            const opts = {
                types: [
                    {
                        suggestedName: "mapData.json",
                        description: "保存的文件名称",
                        accept: { "text/plain": [".json"] },
                    },
                ],
            };
            let newHandle = await window["showSaveFilePicker"](opts);
            const writableStream = await newHandle.createWritable();
            let juhua = await JuHuaDlg.show();
            await writableStream.write(data);
            await writableStream.close();
            juhua.close();
            MessageTip.show({ msg: '保存成功' });
        } catch {
            alert("用户取消了保存操作");
        }
    }

    public createObjectURL(obj: Blob | MediaSource) {
        if (!obj) return null;
        return null != window.URL ? window.URL.createObjectURL(obj) : window.webkitURL.createObjectURL(obj);
    }

}


