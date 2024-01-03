import { jsx } from './Utils'
import { TreeView } from './components/TreeView'
import { Tree } from './components/Tree'

export function Index(tree: Tree) {
    return jsx/* HTML */ `
        <html lang="en" data-theme="dark">
            <head>
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <script src="https://unpkg.com/htmx.org@1.9.5"></script>
                <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
                <script src="https://unpkg.com/htmx.org/dist/ext/json-enc.js"></script>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css"
                />
                <style>
                    .node-item {
                    }
                    .node-item form {
                        margin-bottom: unset;
                    }
                    .node-children {
                        padding-left: 20px;
                        padding-top: 7px;

                        display: grid;
                        grid-template-rows: 1fr;
                        transition: grid-template-rows 500ms;
                    }
                    .hide-node-children {
                        grid-template-rows: 0fr;
                    }
                    .node-children > div {
                        overflow: hidden;
                    }
                    .red {
                        color: red;
                    }
                </style>
                <title>Tree View</title>
            </head>

            <body>
                <header class="container">
                    <h1>Tree View component</h1>
                </header>
                <main class="container">${TreeView(tree)}</main>
            </body>
        </html>
    `
}
