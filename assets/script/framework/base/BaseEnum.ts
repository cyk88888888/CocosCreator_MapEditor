
/*
 * @Descripttion: 框架枚举类
 * @Author: CYK
 * @Date: 2022-06-25 15:57:33
 */
export namespace BaseEnum{
    export enum Game{
        onSpPlayEnd = 'onSpPlayEnd',
    }
    
    // 读取文件方式
    export enum READ_FILE_TYPE {
        DATA_URL,// readAsDataURL, base64
        TEXT,// readAsText
        BINARY,// readAsBinaryString
        ARRAYBUFFER,// readAsArrayBuffer
    }
}
