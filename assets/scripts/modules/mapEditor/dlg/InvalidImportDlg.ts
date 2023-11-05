import { _decorator, Button, Color, Label, Node } from 'cc';
import { UIDlg } from '../../../framework/ui/UIDlg';
import { BaseUT } from '../../../framework/base/BaseUtil';
const { ccclass, property } = _decorator;

@ccclass('InvalidImportDlg')
export class InvalidImportDlg extends UIDlg {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/mapEditor/dlg/InvalidImportDlg';
    @property({ type: Node })
    private grp_label: Node;
    @property({ type: Button })
    private btn_close: Button;

    protected ctor(): void {
        let self = this;
        self.outSideClosed = true;
    }

    protected dchg(): void {
        let self = this;
        let data = self.data;
        let msgList = data.errorMsg.split('|');
        for (let i = 0; i < msgList.length; i++) {
            let str = msgList[i];
            if(!str) continue;
            let lblNode = BaseUT.newUINode(`lbl_msg${i}`);
            let label = lblNode.addComponent(Label);
            label.fontSize = 30;
            label.color.fromHEX('#000000');
            label.string = `${i + 1}. ${str}`;
            lblNode.setParent(self.grp_label);
        }
    }

}


