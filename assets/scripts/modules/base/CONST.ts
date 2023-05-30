/*
 * @Descripttion: 枚举类
 * @Author: CYK
 * @Date: 2023-03-24 23:26:33
 */
export namespace CONST {
    // 甜品的种类
    export enum SweetType {
        EMPTY,
        NORMAL,
        BARRIER,
        ROW_CLEAR,
        COLUM_CLEAR,
        RAINBOWCANDY,
        COUNT
    }

    export enum CELL_STATUS {
        EMPTY = "empty",
        COMMON = "common",
        CLICK = "click",
        LINE = "line",
        COLUMN = "column",
        WRAP = "wrap",
        BIRD = "bird"
    }

    export enum CELL_TYPE {
        EMPTY = 0,
        A = 1,
        B = 2,
        C = 3,
        D = 4,
        E = 5,
        F = 6,
        G = 7
    }

    export const CELL_BASENUM = 6;

    export const GRID_WIDTH = 9;
    export const GRID_HEIGHT = 9;

    export const CELL_WIDTH = 70;
    export const CELL_HEIGHT = 70;

    export const GRID_PIXEL_WIDTH = GRID_WIDTH * CELL_WIDTH;
    export const GRID_PIXEL_HEIGHT = GRID_HEIGHT * CELL_HEIGHT;

    // ********************   时间表  animation time **************************
    export enum ANITIME{
        TOUCH_MOVE = 0.3,
        DIE = 0.2,
        DOWN = 0.5,
        BOMB_DELAY = 0.3,
        BOMB_BIRD_DELAY = 0.7,
        DIE_SHAKE = 0.4 // 死前抖动
    }
}
