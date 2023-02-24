/*
 * @Descripttion: 说明
 * @Author: CYK
 * @Date: 2022-05-16 09:18:45
 */
import { _decorator, Node, ProgressBar } from 'cc';
import { BaseEnum } from '../../framework/base/BaseEnum';
import { FileMgr } from '../../framework/mgr/FileMgr';
import { UILayer } from '../../framework/ui/UILayer';
import { ButtonPlus } from '../../framework/uiComp/ButtonPlus';

const { ccclass, property } = _decorator;

@ccclass('MapEditorLayer')
export class MapEditorLayer extends UILayer {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/mapEditor/MapEditorLayer';
    @property({ type: ButtonPlus })
    private btn_fileSelect: ButtonPlus;
    @property({ type: ButtonPlus })
    private btn_fileSave: ButtonPlus;
    protected onEnter() {
        let self = this;

    }

    /** 打开文件选择器+读取数据 */
    private _tap_btn_fileSelect() {
        // 打开文件选择器
        FileMgr.inst.openLocalFile(null, (file) => {
            console.log("file", file)
            // 读取数据
            FileMgr.inst.readLocalFile(file, BaseEnum.READ_FILE_TYPE.TEXT, (result) => {
                console.log("file result", result)
            })
        });
    }

    /** 保存数据到文件 */
    private _tap_btn_fileSave() {
        let list = [{ type: 1, aa: 5 }, { type: 3, bb: 66 }];
        FileMgr.inst.saveForBrowser(JSON.stringify(list), `json/${1}.json`);
    }

}

