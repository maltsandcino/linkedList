## linkedList
# Simple linked list with a few methods. To String method, get size, pop, append, prepend, find, and contains. I could have added a third hashset to make find more efficient, but it is what it is.

class Node{
    constructor(val, next=null, parent=null){
        this.val = val;
        this.next = next;
        this.parent = parent;
    }

}

class LinkedList{
    constructor(){
        this.head = null;
        this.size = 0
        this.tail = null;
        this.values = {}
        this.indices = {}
    }

    append(nodeval) {
        let node = new Node(nodeval);
        if (this.tail === null) {
            this.head = node;
            this.tail = node;
        } else {
            let tail = this.tail;
            node.parent = tail;
            tail.next = node;
            this.tail = node;
        }
        this.size += 1;
        if (this.values.hasOwnProperty(node.val)) {
            this.values[node.val] += 1;
        } else {
            this.values[node.val] = 1;
        }
        this.indices[this.size] = node.val;
        return `Node with value ${nodeval} appended to list.`
    }

    prepend(nodeval) {
        let node = new Node(nodeval);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head.parent = node;
            this.head = node;
        }
        this.size += 1;
        if (this.values.hasOwnProperty(node.val)) {
            this.values[node.val] += 1;
        } else {
            this.values[node.val] = 1;
        }
        // Restructure the indices keys
        let newTable = {};
        for (let key in this.indices) {
            if (this.indices.hasOwnProperty(key)) {
                const newKey = parseInt(key) + 1;
                newTable[newKey] = this.indices[key];
            }
        }
        newTable[1] = node.val;
        this.indices = newTable;
        return `Node with value ${nodeval} prepended to list.`
    }

    getSize(){
        return this.size
    }

    getHead(){
        return this.head
    }

    getTail(){
        return this.tail
    }

    pop(){
        let node = this.tail;
        this.tail = node.parent
        if(this.values.hasOwnProperty(node.val)){
            this.values[node.val]--
        }
        delete this.indices[this.size]
        this.size--
        return node
    }

    contains(value){
        if(this.values.hasOwnProperty(value)){
            if(this.values[value] > 0){
                return true
            }
        }
        return false
    }

    find(value){
        let found_indices = [];
        if(this.values.hasOwnProperty(value)){
            if(this.values[value] > 0){
                for(let key in this.indices){
                    if (this.indices[key] === value){
                        found_indices.push(key)
                    }
                }
            }
        if (found_indices.length > 0) {
            return found_indices
        }
        else return null
    }}

    toString(){
        let string_value = "";
        let cur = this.head;
        while (cur != null){
            string_value += cur.val;
            string_value += " -> "
            cur = cur.next;
        }
        string_value += 'null'
        return string_value
    }

}
