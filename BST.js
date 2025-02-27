class Node{
    constructor(val, left=null, right=null){
        this.val = val;
        this.right = right;
        this.left = left;
    }

}

function construct_tree(vals){
    vals.sort((a, b) => a - b)
    if (vals.length == 0){
        return null;
    }
    const leng = vals.length;
    const m = Math.floor(leng/2)

    const root = new Node(vals[m])
    root.left = construct_tree(vals.slice(0, m))
    root.right = construct_tree(vals.slice(m+1, leng))

    return root
}

root = construct_tree([3, 2, 1, 4, 5, 12, 33, 44, 23, 69, 11, 101])

console.log(root)