import { Graphics, _decorator } from 'cc';
import { ListItem } from '../../../../../extensions/cocos-framework/src/uiComp/ListItem';
const { ccclass, property } = _decorator;

@ccclass('PathSizeIR')
export class PathSizeIR extends ListItem {
    @property({ type: Graphics, tooltip: "物件资源图片" })
    private graphicsSize: Graphics;
    protected dchg(): void {
        let self = this; 
        let data = self. data;
        let radius = data.radius;//半径
        self.graphicsSize.clear();
        self.graphicsSize.fillColor.fromHEX('#000000');
        self.graphicsSize.circle(0, 0, radius);
        self.graphicsSize.fill();
    }
}

