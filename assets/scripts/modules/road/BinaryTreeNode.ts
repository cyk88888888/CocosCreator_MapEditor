import RoadNode from "./RoadNode";
/** 
 * @descripttion 二堆叉结构存储
 * @author cyk
 * @date 2023-06-30 22:00:00
 */
export default class BinaryTreeNode {

    /**
     * 当前寻路标记,用于标记节点是否属于当前次寻路运算
     */
    public seekTag: number = 0;

    /**
     * 开启列表根节点
     */
    public openNode: RoadNode = null;

    /**
     * 计数当次寻路的运算代价（用于测试数据）
     */
    public count: number = 0;

    /**
     * 刷新寻路tag标记，用于标记当前是哪次的寻路
     */
    public refleshTag() {
        this.openNode = null;

        this.count = 0;

        this.seekTag++;

        if (this.seekTag > 1000000000) {
            this.seekTag = 0;
        }
    }

    /**
     * 二叉堆树是否为空，即没有任何节点加入
     * @returns 
     */
    public isTreeNull() {
        return this.openNode == null;
    }

    /**
     * 把节点添加进二叉堆里
     * @param roadNode 要添加的节点
     * @param head 从哪个节点位置开始添加
     * @returns 
     */
    public addTreeNode(roadNode: RoadNode, head: RoadNode = null) {
        this.count++; //计数统计运算代价

        if (head == null) {
            if (this.openNode == null) //如果开启节点为空，则拿首次加二叉堆的节点作为开启节点
            {
                this.openNode = roadNode;
                //console.log(this.count,"add root ",roadNode.f,roadNode.toString());
                return;
            } else //如果开启节点存在，头节点为null,默认把开启节点用于头节点
            {
                head = this.openNode;
            }
        }

        if (head == roadNode) //如果头和新节点是同一个点则不处理，否则会进入父节点和子节点之间的关联死循环，造成检索树节点时死循环卡死（重要）
        {
            return;
        }

        if (roadNode.f >= head.f) {
            if (head.right == null) {
                head.right = roadNode;
                roadNode.treeParent = head;
                //console.log(this.count,"add right ",roadNode.f,roadNode.toString());
            } else {
                this.addTreeNode(roadNode, head.right);
            }
        } else {
            if (head.left == null) {
                head.left = roadNode;
                roadNode.treeParent = head;
                //console.log(this.count,"add left ",roadNode.f,roadNode.toString());
            } else {
                this.addTreeNode(roadNode, head.left);
            }
        }
    }

    /**
     * 删除树节点
     * @param roadNode 要删除的节点
     */
    public removeTreeNode(roadNode: RoadNode) {
        this.count++; //计数统计运算代价

        if (roadNode.treeParent == null && roadNode.left == null && roadNode.right == null) {
            if (roadNode == this.openNode) //父节点和左右节点都为空，并且等于根节点，证明只剩根节点了
            {
                this.openNode = null; //删除根节点
            } else {
                //节点不在树结构中,不做任何处理
            }

            return;
        }

        if (roadNode.treeParent == null) //如果是根节点，优先把左子节点转换成根节点，左子节点不存在，则把右子节点转换成根节点
        {
            if (roadNode.left) {
                this.openNode = roadNode.left;
                roadNode.left.treeParent = null;

                if (roadNode.right) {
                    roadNode.right.treeParent = null;
                    this.addTreeNode(roadNode.right, this.openNode);
                }
            } else if (roadNode.right) //如果没有左节点，只有右节点
            {
                this.openNode = roadNode.right;
                roadNode.right.treeParent = null;
            }
        } else {

            if (roadNode.treeParent.left == roadNode) //如果是左子节点
            {
                if (roadNode.right) {
                    roadNode.treeParent.left = roadNode.right;
                    roadNode.right.treeParent = roadNode.treeParent;

                    if (roadNode.left) {
                        roadNode.left.treeParent = null;
                        this.addTreeNode(roadNode.left, roadNode.right)
                    }
                } else {
                    roadNode.treeParent.left = roadNode.left;
                    if (roadNode.left) {
                        roadNode.left.treeParent = roadNode.treeParent;
                    }
                }



            } else if (roadNode.treeParent.right == roadNode)  //如果是右子节点
            {
                if (roadNode.left) {
                    roadNode.treeParent.right = roadNode.left;
                    roadNode.left.treeParent = roadNode.treeParent;

                    if (roadNode.right) {
                        roadNode.right.treeParent = null;
                        this.addTreeNode(roadNode.right, roadNode.left)
                    }
                } else {
                    roadNode.treeParent.right = roadNode.right;
                    if (roadNode.right) {
                        roadNode.right.treeParent = roadNode.treeParent;
                    }
                }

            }

        }

        roadNode.resetTree();

    }

    /**
     * 从二叉堆结构里快速查找除f值最小的路节点
     * @param head 搜索的起始节点
     * @returns 
     */
    public getMin_F_Node(head: RoadNode = null): RoadNode {
        this.count++; //计数统计运算代价

        if (head == null) {
            if (this.openNode == null) {
                return null;
            } else {
                head = this.openNode; //如果头节点为null，并且开启节点不为空，则头节点默认使用开启节点
            }
        }

        if (head.left == null) {
            var minNode: RoadNode = head;

            if (head.treeParent == null) {
                this.openNode = head.right;
                if (this.openNode) {
                    this.openNode.treeParent = null;
                }
            } else {
                head.treeParent.left = head.right;
                if (head.right) {
                    head.right.treeParent = head.treeParent;
                }
            }

            return minNode;
        } else {
            return this.getMin_F_Node(head.left);
        }
    }

    /**
     * 把节点加入开启列表，即打入开启列表标志
     * @param node 
     */
    public setRoadNodeInOpenList(node: RoadNode) {
        node.openTag = this.seekTag; //给节点打入开放列表的标志
        node.closeTag = 0; //关闭列表标志关闭
    }

    /**
     * 把节点加入关闭列表，即打入关闭列表标志
     * @param node 
     */
    public setRoadNodeInCloseList(node: RoadNode) {
        node.openTag = 0; //开放列表标志关闭
        node.closeTag = this.seekTag; //给节点打入关闭列表的标志
    }

    /**
     * 节点是否在开启列表
     * @param node 
     * @returns 
     */
    public isInOpenList(node: RoadNode): Boolean {
        return node.openTag == this.seekTag;
    }

    /**
     * 节点是否在关闭列表 
     * @param node 
     * @returns 
     */
    public isInCloseList(node: RoadNode): Boolean {
        return node.closeTag == this.seekTag;
    }

    public getOpenList(): RoadNode[] {
        var openList: RoadNode[] = []
        this.seachTree(this.openNode, openList);
        return openList;
    }

    private seachTree(head: RoadNode, openList: RoadNode[]) {
        if (head == null) {
            return;
        }

        openList.push(head);

        if (head.left) {
            this.seachTree(head.left, openList);
        }

        if (head.right) {
            this.seachTree(head.right, openList);
        }
    }

}
