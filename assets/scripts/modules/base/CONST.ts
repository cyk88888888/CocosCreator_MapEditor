/*
 * @Descripttion: 枚举类
 * @Author: CYK
 * @Date: 2023-03-24 23:26:33
 */
export namespace CONST {
    export enum GEVT {
        ImportMapJson = "ImportMapJson",
        UpdateMapInfo = "UpdateMapInfo",
    }

    /** 路径类型*/
    export enum PathType{
        GridType_walk = "GridType_walk",//可行走
        GridType_WaterVerts = "GridType_WaterVerts",//落水点
        GridType_start = "GridType_start",//起始点
    }

    /**场景物件类型 */
    export enum MapThingType{
        task = 1,//任务
        rail = 2,//围栏
        queen = 3,//女王
        keyMan = 4,//关键人物
        grass = 5,//草丛
        tree = 6,//树
        bee = 7,//蜂窝
    }

    /**导出json数据结构 */
    export interface MapJsonInfo{
        mapWidth:number;
		mapHeight:number;
		totRow:number;
		totCol:number;
		cellSize:number;
		walkList:number[];
		blockList:number[];
		blockVertList:number[];
		waterList:number[];
		waterVertList:number[];
		startList:number[];
		mapThingList:MapThingInfo[];
		borderList:number[];
    }

    /**场景物件数据结构 */
    export interface MapThingInfo{
        x:number;
		y:number;
		anchorX:number;
		anchorY:number;
		width:number;
		height:number;
		thingName:string;
		taskId:number;
		groupId:number;
		groupIdStr:string;
		type:number;
		area:number[];
		unWalkArea:number[];
		keyManStandArea:number[];
		grassArea:number[];
    }

    /**场景物件类型Json数据结构 */
    export interface thingPramInfo{
        thingTypeList: thingTypeList[];
    }

    /**场景物件类型列表Json数据结构 */
    export interface thingTypeList{
        type: CONST.MapThingType;
        desc: string;
    }
}
