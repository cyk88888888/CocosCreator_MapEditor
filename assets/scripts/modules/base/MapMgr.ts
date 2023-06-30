/*
 * @Descripttion: 地图管理器
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
            this._inst.init();
        }
        return this._inst;
    }

    /** 导入的地图切片数组*/
    public mapFloorArr: any[];
    /** 导入等待地图切片列数*/
    public mapslice: number;
    /** 地图宽*/
    public mapWidth: number;
    /** 地图高*/
    public mapHeight: number;
    /**地图格子列数 */
    public numCols: number;
    /**地图格子行数 */
    public numRows: number;
    /**格子大小 */
    public cellSize: number;
    /**绘制的格子范围大小 */
    public gridRange: number;
    /**当前绘制的格子类型 */
    public gridType: CONST.GridType;
    /**绘制格子的单个Graphic区域大小 */
    public areaGraphicSize: number;
    /** 导入的地图场景物件数组*/
    public mapThingArr: any[];
    /**当前绘制的格子数据 */
    public gridTypeMap: any;

    public init(){
        let self = this;
        self.gridRange = 0;
        self.gridType = CONST.GridType.GridType_none;
    }

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
        let mapData: CONST.MapJsonInfo, thingPram: CONST.thingPramInfo;
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
                        self.mapThingArr.push({ sourceName: parent.name.split(".")[0], nativePath: fileIOHandler.createObjectURL(file) });
                    }
                }
                if (parent.name == "map.json") {
                    let file: File = await parent.getFile();
                    let content = await fileIOHandler.readLocalText(file);
                    mapData = JSON.parse(content);
                } else if (parent.name == "thingPram.json") {
                    let file: File = await parent.getFile();
                    let content = await fileIOHandler.readLocalText(file);
                    thingPram = JSON.parse(content);
                }
            }
        }

        self.mapFloorArr.sort((a: any, b: any): number => {
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
        console.log(mapData, thingPram);
        self.cellSize = mapData.cellSize || 20;
        self.gridTypeMap = {};
        emmiter.emit(CONST.GEVT.ImportMapJson, { mapData: mapData, thingPram: thingPram });
    }

    /**
     * 根据格子类型获取对应颜色
     * @param type 格子类型
     * @returns 
     */
    public getColorByType(type: CONST.GridType): string {
        switch (type) {
            case CONST.GridType.GridType_walk:
                return '#00FF00';
            case CONST.GridType.GridType_WaterVerts:
                return '#FF00FF';
            case CONST.GridType.GridType_start:
                return '#FFFF00';
            default:
                return '#000000';
        }
    }

    /**地图位置坐标转为格子坐标 */
    public pos2Grid(x: number, y: number): { x: number, y: number } {
        let self = this;
        return { x: Math.floor(x / self.cellSize), y: Math.floor(y / self.cellSize) };
    }


}
