import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import { Index } from './Index'

import { TreeDemoSeed } from './TreeDemoSeed'
import { TreeViewNode } from './components/TreeViewNode'
import { NodeCheckedState, TreeNode } from './components/Tree'
import { TreeView } from './components/TreeView'

// const httpsServeConfig = {
//   serve: {
//     tls: {
//       key: Bun.file("/etc/ssl/private/bane-selfsigned.key"),
//       cert: Bun.file("/etc/ssl/certs/bane-selfsigned.crt")
//     }
//   }
// }
//const app = new Elysia(httpsServeConfig)

let myTree = TreeDemoSeed()
const app = new Elysia()
    .use(html())
    .head('/', () => {
        return ''
    })
    .get('/', () => {
        return Index(myTree)
    })
    .get('tree-view', () => {
        return TreeView(myTree)
    })
    .get('tree-view-node/:nodeId', ({ params: { nodeId } }) => {
        let node = myTree.getNodeById(nodeId)
        return TreeViewNode(node)
    })
    .post(
        'tree-view-node-check/:nodeId',
        ({ params: { nodeId }, body, set }) => {
            let node = myTree.getNodeById(nodeId)
            node.setChecked(
                Number.parseInt(body['current_value']) ===
                    NodeCheckedState.checked
                    ? NodeCheckedState.unchecked
                    : NodeCheckedState.checked
            )
            let mostParentNodeId = getMostParentNodeId(node)
            let h = {}
            h[`node-${mostParentNodeId}`] = true
            set.headers['HX-Trigger'] = JSON.stringify(h)
        }
    )
    .post(
        'tree-view-node-collapse/:nodeId',
        ({ params: { nodeId }, body, set }) => {
            let node = myTree.getNodeById(nodeId)
            node.setCollapsed(body['collapsed_status'] === 'false')
            let h = {}
            h[`node-${nodeId}`] = true
            set.headers['HX-Trigger'] = JSON.stringify(h)
        }
    )
    .listen(3000)
    .onError(e => console.log(e))

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

function getMostParentNodeId(node: TreeNode) {
    if (node.parentNodeId == undefined) return node.id
    let parent = myTree.getNodeById(node.parentNodeId)
    if (parent.parentNodeId == undefined) return node.id
    return getMostParentNodeId(parent)
}
