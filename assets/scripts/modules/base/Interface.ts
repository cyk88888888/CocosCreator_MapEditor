import { Vec2 } from "cc";
import { CONST } from "./CONST";

export namespace G {
    /**导出json数据结构 */
    export interface MapJsonInfo {
        mapWidth: number;
        mapHeight: number;
        totRow: number;
        totCol: number;
        cellSize: number;
        walkList: number[][];
        blockList: number[];
        blockVertList: number[];
        waterList: number[];
        waterVertList: number[];
        startList: number[];
        mapThingList: MapThingInfo[];
        borderList: { x: number, y: number, groupIdList: number[] }[];
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
    export interface ThingPramInfo {
        thingTypeList: ThingTypeList[];
    }

    /**场景物件类型列表Json数据结构 */
    export interface ThingTypeList {
        type: CONST.MapThingType;
        desc: string;
    }

    /**场景物件拖拽数据结构 */
    export interface DragMapthingInfo {
        url: string;
        /**物件名称 */
        thingName?: string;
        /**物件绑定的任务id */
        taskId?: number;
        /**物件归属的组id */
        groupId?: number;
        /**物件斜角顶点组id(1,2) */
        groupIdStr?: string;
        /**物件类型 */
        type?: number;
        /**物件锚点X */
        anchorX?: number;
        /**物件锚点Y */
        anchorY?: number;
        /**物件坐标X */
        x?: number;
        /**物件坐标Y */
        y?: number;
        isByDrag?: boolean;
    }
}