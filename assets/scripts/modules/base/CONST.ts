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
}
