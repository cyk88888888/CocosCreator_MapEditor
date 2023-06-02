import { Graphics, Label, _decorator } from 'cc';
import { ListItem } from '../../../framework/uiComp/ListItem';
import { MapMgr } from '../../base/MapMgr';
const { ccclass, property } = _decorator;

@ccclass('PathIR')
export class PathIR extends ListItem {
    @property({ type: Graphics, tooltip: "物件资源图片" })
    private graphicsSize: Graphics;
    @property({ type: Label, tooltip: "路径类型" })
    private lbl_name: Label;
    protected dchg(): void {
        let self = this; 
        let data = self. data;
        self.lbl_name.string = data.desc;
        let color = MapMgr.inst.getColorByType(data.pathType);
        self.graphicsSize.clear();
        self.graphicsSize.fillColor.fromHEX(color);
        self.graphicsSize.rect(-40, -40, 80, 80);
        self.graphicsSize.fill();
    }
}

