import { jsx } from '../Utils'
import { TreeViewNode } from './TreeViewNode'
import { ITree } from './Tree'
export function TreeView(tree: ITree): string {
    return jsx/* HTML */ `
        <section hx-trigger="refreshTree from:body" hx-get="/tree-view">
            ${[...tree.root.children.values()].map(node => TreeViewNode(node))}
        </section>
    `
}
