/*
 * @Descripttion: 背包弹窗
 * @Author: CYK
 * @Date: 2022-05-12 09:23:41
 */
import { Button, instantiate, Label, Node, Prefab, Vec3, _decorator } from 'cc';
import { UIDlg } from '../../framework/ui/UIDlg';
import { ImgLoader } from '../../framework/uiComp/ImgLoader';
import List from '../../framework/uiComp/List';
const { ccclass, property } = _decorator;

@ccclass('BagDlg')
export class BagDlg extends UIDlg {
    /** 预制体路径 */
    public static prefabUrl: string = 'prefab/bag/BagDlg';
    @property({ type: Button })
    private btn_close: Button;
    @property(List)
    private list_bag: List;
    @property(Prefab)
    private bagItem: Prefab;
    @property(Label)
    curPage: Label = null;

    private _bagDataList: any[];
    private totalItemNum: number = 90;  //总Item数
    private pagePreNum: number = 12;    //每页Item数量
    private pageTotalNum: number;       //总页数
    protected onEnter() {
        let self = this;
        self._bagDataList = [];
        for (let i = 0; i < self.totalItemNum; i++) {
            self._bagDataList.push({ icon: "dy/icon/i" + Math.floor(Math.random() * 10), count: Math.floor(Math.random() * 100) })
        }
        this.pageTotalNum = Math.ceil(this.totalItemNum / this.pagePreNum);//总页数
        this.list_bag.numItems = this.pageTotalNum;
        this.onPageChange();

    }

    //水平列表渲染器
    onListRender(item: Node, idx: number) {
        if (item.children.length) {
            for (let n = 0; n < item.children.length; n++) {
                let bi: any = item.children[n];
                let exactIdx = (idx * this.pagePreNum) + n;
                bi.getChildByName('icon').getComponent(ImgLoader).url = exactIdx < this.totalItemNum ? this._bagDataList[exactIdx].icon : '';
            }
        } else {
            // 我这里就不考虑性能了，直接实例化。
            for (let n = 0; n < this.pagePreNum; n++) {
                let bi = instantiate(this.bagItem);
                bi.setParent(item);
                let exactIdx = (idx * this.pagePreNum) + n;
                console.log('exactIdx: ' + exactIdx);
                bi.getChildByName('icon').getComponent(ImgLoader).url = this._bagDataList[exactIdx].icon;
            }
        }

        let pos: Vec3 = item.getPosition();
        item.setPosition(new Vec3(pos.x, 156));
    }

    //当列表项被选择...
    onListSelected(item: Node, selectedIdx: number, lastSelectedIdx: number, val: number) {
        let self = this;
        let itemInfo = self._bagDataList[selectedIdx];
        console.log(selectedIdx);

    }

    onPageChange(pageNum: number = null) {
        let pageN = pageNum == null ? this.list_bag.curPageNum : pageNum;
        this.curPage.string = '当前页数：' + (pageN + 1);
    }

    private _tap_btn_close() {
        this.close();
    }
}

