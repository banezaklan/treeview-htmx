import { jsx } from '../Utils'
import { ITreeNode, NodeCheckedState } from './Tree'

export function TreeViewNode(node: ITreeNode): string {
    return jsx/* HTML */ `
        <div
            id="node-${node.id}"
            class="node-item"
            hx-trigger="node-${node.id} from:body"
            hx-get="tree-view-node/${node.id}"
        >
            <form id="form-node-${node.id}" hx-ext="json-enc">
                <div style="display: flex;">
                    <div>
                        <input
                            type="checkbox"
                            id="node-check-box-${node.id}"
                            name="node-check"
                            hx-trigger="click"
                            hx-post="/tree-view-node-check/${node.id}"
                            ${node.checked === NodeCheckedState.checked
                                ? 'checked'
                                : ''}
                        />
                        <input
                            type="hidden"
                            name="current_value"
                            value="${node.checked}"
                            _="on load if @value is '2' js document.getElementById('node-check-box-${node.id}').indeterminate = true"
                        />
                        <input
                            type="hidden"
                            name="collapsed_status"
                            value="${node.collapsed ? 'true' : 'false'}"
                        />
                        <span>${node.title}</span>
                    </div>
                    <div style="padding-left: 10px; font-size: 20px;">
                        ${node.children.size > 0
                            ? `<a
                                hx-trigger="click"
                                hx-post="/tree-view-node-collapse/${node.id}"
                                >
                                ${node.collapsed ? '&#709;' : '&#708;'}
                                </a>`
                            : ''}
                    </div>
                </div>
            </form>
            <div
                class="node-children ${node.collapsed
                    ? 'hide-node-children'
                    : ''}"
            >
                <div>
                    ${[...node.children.values()].map(childNode =>
                        TreeViewNode(childNode)
                    )}
                </div>
            </div>
        </div>
    `
}
