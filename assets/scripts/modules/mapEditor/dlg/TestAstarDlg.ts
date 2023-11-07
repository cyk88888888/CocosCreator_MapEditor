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
    @property({ type: EditBox })
    private input_radius: EditBox;
    @property({ type: Button })
    private btn_ok: Button;
    @property({ type: Button })
    private btn_clear: Button;
    @property({ type: Button })
    private btn_close: Button;

    protected onEnter(): void {
        let self = this;
        //起点测试坐标
        self.input_startX.string = "2240";
        self.input_startY.string = "4080";
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

        let radius = Number(self.input_radius.string || 25);
        let roadNodeArr = PathFindingAgent.inst.seekPath(Number(self.input_startX.string), Number(self.input_startY.string), Number(self.input_endX.string), Number(self.input_endY.string), radius);
        if (!roadNodeArr || !roadNodeArr.length) {
            MessageTip.show({ msg: "未找到最佳路线" });
            return;
        }

        //测试同时多人寻路
        // let roadNodeArr = [];
        // let roadNodeArr1 = PathFindingAgent.inst.seekPath(1960, 5280, 500, 1620, radius);
        // if(roadNodeArr1) roadNodeArr = roadNodeArr.concat(roadNodeArr1);
        // console.log(roadNodeArr1);
        // let roadNodeArr2 = PathFindingAgent.inst.seekPath(1960, 5280, 3500, 1240, radius);
        // if(roadNodeArr2) roadNodeArr = roadNodeArr.concat(roadNodeArr2);
        // console.log(roadNodeArr2);
        // let roadNodeArr3 = PathFindingAgent.inst.seekPath(1960, 5280, 3280, 5080, radius);
        // if(roadNodeArr3) roadNodeArr = roadNodeArr.concat(roadNodeArr3);
        // console.log(roadNodeArr3);

        self.emit(CONST.GEVT.UpdateAstarGrid, { roadNodeArr: roadNodeArr });
    }

    /** 清除寻路路线*/
    private _tap_btn_clear() {
        let self = this;
        self.emit(CONST.GEVT.UpdateAstarGrid, { roadNodeArr: [] });
    }
}


