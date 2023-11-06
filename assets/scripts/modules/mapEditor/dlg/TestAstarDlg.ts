import { _decorator, Button, Color, EditBox, Label, Node } from 'cc';
import { UIDlg } from '../../../framework/ui/UIDlg';
import { MessageTip } from '../../common/message/MessageTip';
import PathFindingAgent from '../../road/PathFindingAgent';
import { CONST } from '../../base/CONST';
const { ccclass, property } = _decorator;

@ccclass('TestAstarDlg')
export class TestAstarDlg extends UIDlg {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/mapEditor/dlg/TestAstarDlg';
    @property({ type: EditBox })
    private input_startX: EditBox;
    @property({ type: EditBox })
    private input_startY: EditBox;
    @property({ type: EditBox })
    private input_endX: EditBox;
    @property({ type: EditBox })
    private input_endY: EditBox;
    @property({ type: Button })
    private btn_ok: Button;
    @property({ type: Button })
    private btn_clear: Button;
    @property({ type: Button })
    private btn_close: Button;

    protected ctor(): void {
        let self = this;
        self.outSideClosed = true;
    }

    private _tap_btn_ok() {
        let self = this;
        if (self.input_startX.string == "") {
            MessageTip.show({ msg: "起始x不能为空" });
            return;
        }

        if (self.input_startY.string == "") {
            MessageTip.show({ msg: "起始y不能为空" });
            return;
        }

        if (self.input_endX.string == "") {
            MessageTip.show({ msg: "终点x不能为空" });
            return;
        }

        if (self.input_endY.string == "") {
            MessageTip.show({ msg: "终点y不能为空" });
            return;
        }

        let roadNodeArr = PathFindingAgent.inst.seekPath(Number(self.input_startX.string), Number(self.input_startY.string), Number(self.input_endX.string), Number(self.input_endY.string));
        if (!roadNodeArr || !roadNodeArr.length) {
            MessageTip.show({ msg: "未找到最佳路线" });
            return;
        }
        console.log(roadNodeArr);
        self.emit(CONST.GEVT.UpdateAstarGrid, { roadNodeArr: roadNodeArr });
    }

    /** 清除寻路路线*/
    private _tap_btn_clear() {
        let self = this;
        self.emit(CONST.GEVT.UpdateAstarGrid, { roadNodeArr: [] });
    }
}


