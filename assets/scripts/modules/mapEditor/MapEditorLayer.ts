import { _decorator, Button, profiler } from 'cc';
import { UILayer } from '../../framework/ui/UILayer';
import { FileIOHandler } from '../../framework/mgr/FileIOHandler';
import { MapScrollComp } from './MapScrollComp';
import { MapMgr } from '../base/MapMgr';
import { EventTouch } from 'cc';
import { Node } from 'cc';
import { List } from '../../framework/uiComp/List';
import { CONST } from '../base/CONST';
const { ccclass, property } = _decorator;

/*
 * @Descripttion: 编辑器首页
 * @Author: CYK
 * @Date: 2023-05-30 23:00:00
 */
@ccclass('MapEditorLayer')
export class MapEditorLayer extends UILayer {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/mapEditor/MapEditorLayer';
    @property({ type: Button })
    private btn_changeMap: Button;
    @property({ type: Button })
    private btn_exportJson: Button;
    @property({ type: Button })
    private btn_runDemo: Button;
    @property({ type: Button })
    private btn_showGrid: Button;
    @property({ type: Button })
    private btn_showPath: Button;
    @property({ type: Button })
    private btn_showMapThing: Button;
    @property({ type: Button })
    private btn_profiler: Button;
    @property({ type: MapScrollComp, tooltip: "编辑器地图滚动组件" })
    private mapScrollComp: MapScrollComp;
    @property({ type: Node })
    private grp_editPathSize: Node;
    @property({ type: Node })
    private grp_editPath: Node;
    @property({ type: Node })
    private grp_editMathing: Node;
    @property({ type: List })
    private list_mapThing: List = null;
    @property({ type: List })
    private list_pathSize: List = null;
    @property({ type: List })
    private list_path: List = null;


    private _selectIdx: number;
    protected onEnter() {
        let self = this;
        self.onEmitter(CONST.GEVT.ImportMapJson, self.onImportMapJson);//导入josn地图数据成功
        self._selectIdx = 1;
        self.list_pathSize.selectedId = 0;
        self.showEditOperate();
    }

    private showEditOperate() {
        let self = this;
        self.grp_editPathSize.active = self._selectIdx == 0;
        self.grp_editPath.active = self._selectIdx == 1;
        self.grp_editMathing.active = self._selectIdx == 2;
    }

    private onImportMapJson() {
        let self = this;
        if (self.list_mapThing.content) self.list_mapThing.content.setPosition(0, 0);
        self.refreshList("list_mapThing");
    }

    private _data_list_path() {
        let rst = [
            { pathType: CONST.PathType.GridType_walk, desc: "可行走点" },
            { pathType: CONST.PathType.GridType_start, desc: "起始地点" },
            { pathType: CONST.PathType.GridType_WaterVerts, desc: "落水点" }
        ];
        return rst;
    }

    private _data_list_pathSize() {
        let rst = [{ radius: 10, size: 0 }, { radius: 15, size: 2 }, { radius: 20, size: 4 }, { radius: 25, size: 6 }, { radius: 30, size: 8 }];
        return rst;
    }

    private _data_list_mapThing() {
        let rst = MapMgr.inst.mapThingArr || [];
        return rst;
    }

    /** 打开文件选择器+读取数据 */
    private async _tap_btn_changeMap() {
        MapMgr.inst.changeMap();
    }

    /** 保存数据到文件 */
    private _tap_btn_exportJson() {
        let list = [{ type: 1, aa: 5 }, { type: 3, bb: 66 }, { desc: "我终于搞定web文件存储到本地了!!!" }];
        FileIOHandler.inst.saveTextToLocal(JSON.stringify(list));
    }

    /** 显隐fps*/
    private _tap_btn_profiler() {
        profiler.isShowingStats() ? profiler.hideStats() : profiler.showStats();
    }

    /** 选中对应编辑页签*/
    private select_toogle_group(event: EventTouch, index: any) {
        let self = this;
        let selectIdx = Number(index);
        if (self._selectIdx == selectIdx) return;
        self._selectIdx = selectIdx;
        self.showEditOperate();
    }

    private _tap_btn_runDemo() {
        onmessage();
        // Get handle to draft file
        async function onmessage() {
            // Retrieve message sent to work from main script
            const message = '我终于搞定web文件存储到本地了';
          
            // Get handle to draft file
            // const root = await navigator.storage.getDirectory();
            const opts = {
                suggestedName: "mapData.json",
                types: [
                    {
                        description: "保存的文件名称",
                        accept: { "text/plain": [".json"] },
                    },
                ],
            };
            let root = await window["showSaveFilePicker"](opts);
            const draftHandle = await root.getFileHandle("draft.txt", { create: true });
            // Get sync access handle
            const accessHandle = await draftHandle["createSyncAccessHandle"]();
          
            // Get size of the file.
            const fileSize = accessHandle.getSize();
            // Read file content to a buffer.
            const buffer = new DataView(new ArrayBuffer(fileSize));
            const readBuffer = accessHandle.read(buffer, { at: 0 });
          
            // Write the message to the end of the file.
            const encoder = new TextEncoder();
            const encodedMessage = encoder.encode(message);
            const writeBuffer = accessHandle.write(encodedMessage, { at: readBuffer });
          
            // Persist changes to disk.
            accessHandle.flush();
          
            // Always close FileSystemSyncAccessHandle if done.
            accessHandle.close();
          };
          
    }
}


