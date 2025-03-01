class Node {
    constructor(val, left = null, right = null) {
        this.data = val;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(vals) {
        this.root = this.constructTree(vals);
    }

    constructTree(vals) {
        vals.sort((a, b) => a - b);
        if (vals.length == 0) {
            return null;
        }
        const leng = vals.length;
        const m = Math.floor(leng / 2);

        const root = new Node(vals[m]);
        root.left = this.constructTree(vals.slice(0, m));
        root.right = this.constructTree(vals.slice(m + 1, leng));

        return root;
    }

    insert(value) {
        const insertNode = (root, value) => {
            if (root === null) {
                return new Node(value);
            }

            if (value > root.data) {
                root.right = insertNode(root.right, value);
            } else if (value < root.data) {
                root.left = insertNode(root.left, value);
            }

            return root;
        }

        this.root = insertNode(this.root, value);
    }

    delete(value) {
        const deleteNode = (root, value) => {
            if (root == null) {
                console.log("Sorry Mario, the princess is in another castle");
                return null;
            }

            if (value < root.data) {
                root.left = deleteNode(root.left, value);
            } else if (value > root.data) {
                root.right = deleteNode(root.right, value);
            } else {
                if (root.left == null) {
                    return root.right;
                } else if (root.right == null) {
                    return root.left;
                }

                let search = root.right;
                while (search.left != null) {
                    search = search.left;
                }
                root.data = search.data;
                root.right = deleteNode(root.right, search.data);
            }

            return root;
        }

        this.root = deleteNode(this.root, value);
    }

    levelOrder(callback, r = false) {
        if (this.root == null) {
            return;
        }
        if (callback == null) {
            return "Error no callback function";
        }

        let queue = [];
        queue.push(this.root);

        while (queue.length > 0) {
            let node = queue.shift();
            if (r === true) {
                node = callback(node);
            } else {
                callback(node);
            }
            if (node.left != null) {
                queue.push(node.left);
            }
            if (node.right != null) {
                queue.push(node.right);
            }
        }
    }

    inOrder(callback, node = this.root) {
        if (node == null) {
            return;
        }

        this.inOrder(callback, node.left);
        callback(node);
        this.inOrder(callback, node.right);
    }

    preOrder(callback, node = this.root) {
        if (node == null) {
            return;
        }

        callback(node);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
    }

    postOrder(callback, node = this.root) {
        if (node == null) {
            return;
        }

        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node);
    }

    find(val, node = this.root) {
        if (node == null) {
            return null;
        }
        if (val == node.data) {
            return node;
        }
        if (val < node.data) {
            return this.find(val, node.left);
        }
        return this.find(val, node.right);
    }

    height(node) {
        let start = node instanceof Node ? node : this.find(node, this.root);

        const heightHelper = (node) => {
            if (node == null) {
                return -1; // Return -1 to count edges instead of nodes
            }

            let leftHeight = heightHelper(node.left);
            let rightHeight = heightHelper(node.right);

            return 1 + Math.max(leftHeight, rightHeight);
        }

        return heightHelper(start);
    }

    depth(node, root = this.root) {
        if (root == null) {
            return -1;
        }
        if (node == root.data) {
            return 0;
        }
        if (node < root.data) {
            let ld = this.depth(node, root.left);
            if (ld == -1) {
                return -1;
            }
            return 1 + ld;
        } else {
            let rd = this.depth(node, root.right);
            if (rd == -1) {
                return -1;
            }
            return 1 + rd;
        }
    }

    isBalanced(node = this.root) {
        if (node == null) {
            return true;
        }

        let hl = this.height(node.left);
        let hr = this.height(node.right);
        if (Math.abs(hl - hr) > 1) {
            return false;
        }
        return this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    rebalance() {
        let vals = [];
        this.inOrder(node => vals.push(node.data));
        this.root = this.constructTree(vals);
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}

// Example usage
const tree = new Tree([3, 2, 1, 4, 5, 12, 33, 44, 23, 69, 11])