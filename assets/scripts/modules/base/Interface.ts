import { CONST } from "./CONST";

export namespace G {
    /**导出json数据结构 */
    export interface MapJsonInfo {
        mapWidth: number;
        mapHeight: number;
        totRow: number;
        totCol: number;
        cellSize: number;
        walkList: number[];
        blockList: number[];
        blockVertList: number[];
        waterList: number[];
        waterVertList: number[];
        startList: number[];
        mapThingList: MapThingInfo[];
        borderList: number[];
    }

    /**场景物件数据结构 */
    export interface MapThingInfo {
        x: number;
        y: number;
        anchorX: number;
        anchorY: number;
        width: number;
        height: number;
        thingName: string;
        taskId: number;
        groupId: number;
        groupIdStr: string;
        type: number;
        area: number[];
        unWalkArea: number[];
        keyManStandArea: number[];
        grassArea: number[];
    }

    /**场景物件类型Json数据结构 */
    export interface thingPramInfo {
        thingTypeList: thingTypeList[];
    }

    /**场景物件类型列表Json数据结构 */
    export interface thingTypeList {
        type: CONST.MapThingType;
        desc: string;
    }
}