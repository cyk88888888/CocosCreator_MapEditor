import { _decorator, Button, Component, Layers, Layout, Node, Sprite, SpriteFrame, UITransform } from 'cc';
import { UIComp } from '../../framework/ui/UIComp';
import { CONST } from '../base/CONST';
import { MapMgr } from '../base/MapMgr';
import { ResMgr } from '../../framework/mgr/ResMgr';
const { ccclass, property } = _decorator;

/*
 * @Descripttion: 编辑器地图滚动组件
 * @Author: CYK
 * @Date: 2023-05-30 23:00:00
 */
@ccclass('MapScrollComp')
export class MapScrollComp extends UIComp {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/mapEditor/MapScrollComp';
    @property({ type: Node, tooltip: "地图滚动容器" })
    private grp_map: Node;
    @property({ type: Node, tooltip: "地图切片容器" })
    private grp_mapSlices: Node;

    protected onEnter() {
        let self = this;
        self.onEmitter(CONST.GEVT.ImportMapJson, self.onImportMapJson);//导入josn地图数据成功

    }

    private onImportMapJson() {
        let self = this;
        self.importFloorBg(() => {

        });
    }

    private importFloorBg(cb: Function) {
        let self = this;
        let mapMgr = MapMgr.inst;
        var mapFloorArr = mapMgr.mapFloorArr;
        var mapslice = mapMgr.mapslice;
        var tempX: number = 0;
        var tempY: number = 0;
        var index: number = 0;
        var totWidth: number = 0;
        var totHeight: number = 0;
        var hasFinishOneLine: boolean;
        let mapSliceLayout = self.grp_mapSlices.getComponent(Layout);
        mapSliceLayout.constraintNum = mapslice;
        showFloorItor();
        function showFloorItor() {
            if (mapFloorArr.length > 0) {
                let floorInfo: any = mapFloorArr.shift();
                let url: string = floorInfo.nativePath;
                ResMgr.inst.loadLocalImg(url, (spriteFrame: SpriteFrame) => {
                    index++;
                    console.log(floorInfo.sourceName, spriteFrame.texture.width, spriteFrame.texture.height);
                    tempX = (tempX + spriteFrame.texture.width);
                    if (!hasFinishOneLine) totWidth += spriteFrame.texture.width;
                    if (index == mapslice) {
                        index = 0;
                        tempX = 0;
                        tempY = (tempY + spriteFrame.texture.height);
                        totHeight += spriteFrame.texture.height;
                        hasFinishOneLine = true;
                    };
                    let mapSliceNode = new Node(floorInfo.sourceName);
                    mapSliceNode.addComponent(UITransform);
                    mapSliceNode.layer = Layers.Enum.UI_2D;
                    let sprite = mapSliceNode.addComponent(Sprite);
                    sprite.spriteFrame = spriteFrame;
                    mapSliceNode.setParent(self.grp_mapSlices);
                    showFloorItor();
                }, self);
            } else {
                mapMgr.mapWidth = totWidth;
                mapMgr.mapHeight = totHeight;
                let uiTransform = self.grp_map.getComponent(UITransform);
                uiTransform.width = totWidth;
                uiTransform.height = totHeight;
                self.emit(CONST.GEVT.UpdateMapInfo);
                console.log("地图宽高:" + mapMgr.mapWidth, mapMgr.mapHeight);
                cb.call(self);
            }
        }
    }
}


