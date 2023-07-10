import { _decorator, EventMouse, Node, Prefab, UITransform, Vec3 } from 'cc';
import { UIComp } from '../../../framework/ui/UIComp';
import { MapMgr } from '../../base/MapMgr';
import { G } from '../../base/Interface';
import { CONST } from '../../base/CONST';
import { BaseUT } from '../../../framework/base/BaseUtil';
const { ccclass, property } = _decorator;

/*
 * @Descripttion: 场景物件工厂
 * @Author: CYK
 * @Date: 2023-07-10 22:56:00
 */
@ccclass('MapThingFactory')
export class MapThingFactory extends UIComp {
    @property({ type: Prefab })
    public mapThingPrefab: Prefab;

    private mapMgr: MapMgr;
    private _scrollMapUITranstorm: UITransform;
    protected onEnter(): void {
        let self = this;
        self.mapMgr = MapMgr.inst;
        self.onEmitter(CONST.GEVT.DragMapThingDown, self.onDragMapThingDown);
    }

    public init(data: any) {
        let self = this;
        let mapData: G.MapJsonInfo = data.mapData;
        self._scrollMapUITranstorm = data.scrollMapUITranstorm;

    }

    private onDragMapThingDown(data: G.DragMapthingInfo) {
        let self = this;
        let mousePos = BaseUT.getMousePos(data.location);//这里不直接取evt.getLocation()，再封装一层是因为舞台缩放，会影响evt.getLocation()的坐标） 
        let localUIPos = self._scrollMapUITranstorm.convertToNodeSpaceAR(new Vec3(mousePos.x, mousePos.y, 0));
        let isImportJson: boolean = data.isImportJson;//是否为导入json进来
        let mapThingX: number = isImportJson ? data.x : localUIPos.x;//场景物件坐标X
        let mapThingY: number = isImportJson ? data.y : localUIPos.y;//场景物件坐标Y
        let anchorX: number = data.anchorX == undefined ? 0.5 : data.anchorX;
        let anchorY: number = data.anchorY == undefined ? 0.5 : data.anchorY;
        let mapThingInfo = <G.MapThingInfo>{};
        let mapThingComp = self.mapMgr.getMapThingComp(self.mapThingPrefab, data.url, anchorX, anchorY, imgLoaded, self);
        mapThingComp.setPosition(mapThingX, mapThingY);
        mapThingComp.setParent(self.node);
        function imgLoaded(width:number, height: number){
            mapThingInfo.width = width;
            mapThingInfo.height = height;
            if(!isImportJson){

            }
        }

        mapThingComp.on(Node.EventType.MOUSE_DOWN, self.onMouseDown, self);
    }

    private onMouseDown(e: EventMouse){
        let buttonId = e.getButton();
        if (buttonId == EventMouse.BUTTON_LEFT) {
            console.log('左键点击场景物件');
        } else if (buttonId == EventMouse.BUTTON_RIGHT) {
            console.log('右键点击场景物件');
        }
    }
}


