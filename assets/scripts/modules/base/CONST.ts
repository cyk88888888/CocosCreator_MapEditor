/*
 * @Descripttion: 枚举类
 * @Author: CYK
 * @Date: 2023-03-24 23:26:33
 */
export namespace CONST {
    export enum GEVT {
        ImportMapJson = "ImportMapJson",
        UpdateMapInfo = "UpdateMapInfo",
        ChangeGridType = "ChangeGridType",
        ChangeGridSize = "ChangeGridSize",
        DragMapThingDown = "DragMapThingDown",
    }

    /** 格子类型*/
    export enum GridType {
        GridType_none = "GridType_none",//空
        GridType_walk = "GridType_walk",//可行走
        GridType_WaterVerts = "GridType_WaterVerts",//落水点
        GridType_start = "GridType_start",//起始点
        GridType_mapThing = "GridType_mapThing",//场景物件
    }

    /**场景物件类型 */
    export enum MapThingType {
        task = 1,//任务
        rail = 2,//围栏
        queen = 3,//女王
        keyMan = 4,//关键人物
        grass = 5,//草丛
        tree = 6,//树
        bee = 7,//蜂窝
    }
}
