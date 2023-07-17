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
        UpdateMapScale = "UpdateMapScale",
        DragMapThingStart = "DragMapThingStart",
        ClickMapTing = "ClickMapTing",
        ReDarwGraphic = "ReDarwGraphic",
        ChangeMapThingXY = "ChangeMapThingXY",
        ClearCurMapThingInfo = "ClearCurMapThingInfo",
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
        bevel = 999,//斜角顶点
    }

    /**场景物件触发类型 */
    export enum MapThingTriggerType{
        MapThingTrigger_light = 1,//发亮
        MapThingTrigger_unWalk = 2,//不可行走范围点列表
        MapThingTrigger_keyManStand = 3,//关键人物站立范围点列表(引导模式下，传送机器人用)
        MapThingTrigger_grass = 4,//草丛范围点列表
    }
}
