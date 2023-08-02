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
        } catch(e) {
            alert(e);
        }

        async function getFilesRecursively(handle: FileSystemDirectoryHandle | FileSystemFileHandle) {
            if (handle.kind === "file") {
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
    public async readLocalText(file: File): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if (!file) {
                reject(null);
                return;
            }
            let reader = new FileReader();
            reader.readAsText(file, "utf-8");
            // reader.onprogress = (e: ProgressEvent) => {
            //     console.log(`${file.name}加载进度: ${e.loaded}`);
            // }
            reader.onload = () => {
                resolve(reader.result + '');
            }
            reader.onerror = (ev: ProgressEvent) => {
                reject(null);
            }
        })
    }

    /**保存文本到本地 */
    public async saveTextToLocal(data: string) {
        try {
            const opts = {
                suggestedName: "mapData.json",
                types: [
                    {
                        description: "保存的文件名称",
                        accept: { "text/plain": [".json"] },
                    },
                ],
                excludeAcceptAllOption: true,
            };
            let newHandle = await window["showSaveFilePicker"](opts);
            const writableStream = await newHandle.createWritable();
            let juhua = await JuHuaDlg.show();
            await writableStream.write(data);
            await writableStream.close();
            juhua.close();
            MessageTip.show({ msg: '保存成功' });
        } catch(e) {
            alert(e);
        }
    }

    public createObjectURL(obj: Blob | MediaSource) {
        if (!obj) return null;
        return null != window.URL ? window.URL.createObjectURL(obj) : window.webkitURL.createObjectURL(obj);
    }

}


