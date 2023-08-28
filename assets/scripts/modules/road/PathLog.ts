/**
 * 寻路模块专用的日志打印接口
 */
export default class PathLog {

    public static log: Function = console.log; //默认打印日志
    //public static log:Function = function(...args){}; //默认不打印日志

    /**
     * 设置是否可打印日志
     * @param enable 
     */
    public static setLogEnable(enable: boolean) {
        if (enable) {
            this.log = console.log;
        } else {
            this.log = function (...args) { };
        }
    }

}
