import { Tree, TreeNode } from './components/Tree'
import { generateGUID } from './Utils'

export function TreeDemoSeed(): Tree {
    let todoTree = new Tree()
    let rootTodo = generateRandomTodo()
    let levels = []
    todoTree.add(rootTodo, undefined)

    for (let i = 0; i < 50; i++) {
        let todo = generateRandomTodo()
        let parent: any

        // the topmost 5 todos will share the root as parent
        if (i < 5) {
            parent = todoTree.root
        } else {
            // find a parent among the todos of previous 4 levels
            // (as long as such levels exist; for i < 20, fewer than four previous levels exist)
            let potentialParents = []
            for (let j = 1; j <= 5 && i - j * 5 >= 0; j++) {
                potentialParents.push(levels[i - j * 5])
            }
            parent =
                potentialParents[
                    Math.floor(Math.random() * potentialParents.length)
                ]
        }

        levels.push(todo)
        todoTree.add(todo, parent.id)
    }
    return todoTree
}

function generateRandomTodo(): TreeNode {
    const randomIndex = Math.floor(Math.random() * 100) // Generate a random index
    const title = `Todo ${words[randomIndex]}` // Pick a random word from the array
    return new TreeNode(generateGUID(), title)
}

const words = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew',
    'Iced-tea',
    'Jackfruit',
    'Kiwi',
    'Lemon',
    'Mango',
    'Nectarine',
    'Orange',
    'Papaya',
    'Quince',
    'Raspberry',
    'Strawberry',
    'Tangerine',
    'Ugli-fruit',
    'Vanilla',
    'Watermelon',
    'Xigua',
    'Yam',
    'Zucchini',
    'Almond',
    'Bread',
    'Cheese',
    'Donut',
    'Egg',
    'Fries',
    'Ginger',
    'Hazelnut',
    'Ice-cream',
    'Juice',
    'Ketchup',
    'Lime',
    'Mushroom',
    'Noodle',
    'Oatmeal',
    'Pasta',
    'Quinoa',
    'Raisin',
    'Steak',
    'Tofu',
    'Udon',
    'Vinegar',
    'Walnut',
    'Xmas',
    'Yogurt',
    'Zest',
    'Amber',
    'Blue',
    'Cyan',
    'Dark',
    'Emerald',
    'Fuchsia',
    'Green',
    'Honey',
    'Indigo',
    'Jade',
    'Khaki',
    'Lavender',
    'Magenta',
    'Navy',
    'Olive',
    'Purple',
    'Quartz',
    'Red',
    'Silver',
    'Turquoise',
    'Umbra',
    'Violet',
    'White',
    'Xanthic',
    'Yellow',
    'Zaffre',
    'Alpha',
    'Beta',
    'Gamma',
    'Delta',
    'Epsilon',
    'Zeta',
    'Eta',
    'Theta',
    'Iota',
    'Kappa',
    'Lambda',
    'Mu',
    'Nu',
    'Xi',
    'Omicron',
    'Pi',
    'Rho',
    'Sigma',
    'Tau',
    'Upsilon',
    'Phi',
    'Chi',
    'Psi',
    'Omega'
]
