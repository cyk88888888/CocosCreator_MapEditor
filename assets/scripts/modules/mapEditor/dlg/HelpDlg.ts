import { _decorator, Button } from 'cc';
import { UIDlg } from '../../../framework/ui/UIDlg';
const { ccclass, property } = _decorator;

@ccclass('HelpDlg')
export class HelpDlg extends UIDlg {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/mapEditor/dlg/HelpDlg';
    @property({ type: Button })
    private btn_close: Button;

    protected ctor(): void {
        let self = this;
        self.outSideClosed = true;
    }
}


