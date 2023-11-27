import { SceneMgr } from "../../framework/mgr/SceneMgr";
import { UIDlg } from "../../framework/ui/UIDlg";

export namespace UT{
     /**关闭指定弹窗 */
    export function closeDlgByName(dlgNames: string[]) {
     let tray = SceneMgr.inst.curScene.dlg;
     let children = tray.children || [];
     for (let len = children.length, i = len - 1; i >= 0; i--) {
         let node = children[i];
         let className = node.name;
         if (dlgNames.indexOf(className) > -1) {
             let script = node.getComponent(className) as UIDlg;
             script.close();
         }
     }
 }
}