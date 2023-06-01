/*
 * @Descripttion: 说明
 * @Author: CYK
 * @Date: 2023-06-01 09:05:10
 */
import { emmiter } from "../../framework/base/Emmiter";
import { FileIOHandler } from "../../framework/mgr/FileIOHandler";
import { CONST } from "./CONST";

export class MapMgr {
    private static _inst: MapMgr;
    public static get inst() {
        if (!this._inst) {
            this._inst = new MapMgr();
        }
        return this._inst;
    }

    public mapFloorArr: any[];//导入的地图切片数组
    public mapslice: number;//导入等待地图切片列数
    public mapWidth: number;//地图宽
    public mapHeight: number;//地图高
    public mapThingArr: any[];//导入的地图场景物件数组
    /**
     * 切换地图目录
     */
    public async changeMap() {
        let self = this;
        let fileIOHandler = FileIOHandler.inst;
        let root = await fileIOHandler.getDirTreeMap();
        console.log(root);
        if (!root) return;
        self.mapFloorArr = [];
        self.mapThingArr = [];
        self.mapslice = 0;
        let firstRow: number;
        await getFilesRecursively(root);
        async function getFilesRecursively(parent: FileSystemDirectoryHandle | FileSystemFileHandle) {
            if (parent.kind === 'directory') {
                let children: (FileSystemDirectoryHandle | FileSystemFileHandle)[] = parent["children"] || [];
                if (parent.name === 'floor') {
                    for (let i = 0; i < children.length; i++) {
                        children[i]["rootName"] = "floor";
                        await getFilesRecursively(children[i]);
                    }
                } else if (parent.name === 'thing') {
                    for (let i = 0; i < children.length; i++) {
                        children[i]["rootName"] = "thing";
                        await getFilesRecursively(children[i]);
                    }
                } else {
                    let children: (FileSystemDirectoryHandle | FileSystemFileHandle)[] = parent["children"];
                    for (let i = 0; i < children.length; i++) {
                        await getFilesRecursively(children[i]);
                    }
                }
            } else {
                if (parent["rootName"] == "floor") {
                    let splitNameArr = parent.name.split(".")[0].split("_");
                    let col = Number(splitNameArr[1]);//列
                    let row = Number(splitNameArr[0]);//行
                    let file: File = await parent.getFile();
                    if (!firstRow) firstRow = row;
                    if (firstRow == row) {
                        self.mapslice++;
                    }
                    self.mapFloorArr.push({ col: col, row: row, sourceName: parent.name, nativePath: fileIOHandler.createObjectURL(file) });
                } else if (parent["rootName"] == "thing") {
                    if (parent.name.indexOf("_") == -1) {
                        let file: File = await parent.getFile();
                        self.mapThingArr.push({ sourceName: parent.name, nativePath: fileIOHandler.createObjectURL(file) });
                    }
                }
            }
        }

        self.mapFloorArr.sort(function (a: any, b: any): number {
            if (a.row < b.row) {
                return -1;
            } else if (a.row > b.row) {
                return 1;
            } else {
                if (a.col > b.col) {
                    return 1;
                } else {
                    return -1;
                }
            }
        })
        // console.log(self.mapFloorArr);
        emmiter.emit(CONST.GEVT.ImportMapJson);
        // fileIOHandler.readLocalText();
    }
}
