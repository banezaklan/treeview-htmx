export interface ITreeNode {
    id: string
    title: string
    children: Map<string, ITreeNode>
    checked: NodeCheckedState
    parentNodeId: string
    collapsed: boolean
}

export enum NodeCheckedState {
    unchecked,
    checked,
    indeterminate
}

export class TreeNode extends EventTarget implements ITreeNode {
    id: string
    title: string
    parentNodeId: string
    children: Map<string, TreeNode>
    checked: NodeCheckedState
    collapsed: boolean
    constructor(
        id: string,
        title: string,
        checked: NodeCheckedState = NodeCheckedState.unchecked,
        collapsed = false
    ) {
        super()
        this.id = id
        this.title = title
        this.children = new Map()
        this.checked = checked
        this.collapsed = collapsed
    }

    setChecked(checked: NodeCheckedState = NodeCheckedState.unchecked) {
        this.checked = checked
        ;[...this.children.values()].forEach(childNode =>
            childNode.setChecked(checked)
        )
        this.dispatchEvent(
            new CustomEvent('checkedStateChanged', {
                detail: { nodeId: this.id, checked }
            })
        )
    }

    setCollapsed(collapsed: boolean) {
        this.collapsed = collapsed
    }

    addChild(node: TreeNode) {
        node.setParentNodeId(this.id)
        node.addEventListener('checkedStateChanged', (e: CustomEvent) => {
            this.refreshCheckedStatus()
        })
        this.children.set(node.id, node)
    }

    refreshCheckedStatus() {
        let result = NodeCheckedState.indeterminate
        let childrenCheckedStates = [...this.children.values()].map(
            node => node.checked
        )
        if (
            childrenCheckedStates.every(
                state => state === NodeCheckedState.checked
            )
        ) {
            result = NodeCheckedState.checked
        } else if (
            childrenCheckedStates.every(
                state => state === NodeCheckedState.unchecked
            )
        ) {
            result = NodeCheckedState.unchecked
        }
        this.checked = result
        this.dispatchEvent(
            new CustomEvent('checkedStateChanged', {
                detail: { nodeId: this.id, checked: this.checked }
            })
        )
    }

    setParentNodeId(parentId: string) {
        this.parentNodeId = parentId
    }
}

export interface ITree {
    root: TreeNode | null
    map: Map<string, TreeNode>
}

export class Tree implements ITree {
    root: TreeNode | null
    map: Map<string, TreeNode>

    constructor() {
        this.root = null
        this.map = new Map()
    }

    add(newNode: TreeNode, toNodeId?: string) {
        this.map.set(newNode.id, newNode)
        if (toNodeId !== undefined) {
            const parent = this.map.get(toNodeId)
            if (parent) {
                parent.addChild(newNode)
            } else {
                throw new Error(`Cannot find parent node with id ${toNodeId}`)
            }
        } else {
            if (!this.root) {
                this.root = newNode
            } else {
                throw new Error('Root node is already assigned')
            }
        }
    }

    removeNodeById(nodeId: string) {
        const node = this.map.get(nodeId)
        if (node) {
            this.map.delete(nodeId)
            for (const [_, parent] of this.map) {
                parent.children.delete(nodeId)
            }
        } else {
            throw new Error(`Cannot find node with data: ${nodeId}`)
        }
    }

    getNodeById(nodeId: string): TreeNode | null {
        return this.map.get(nodeId) || null
    }
}
