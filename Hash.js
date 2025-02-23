class Node{
    constructor(key, val, next=null){
        this.val = val
        this.next = next
        this.key = key
    }
}

class HashMap{
    constructor(){
        this.capacity = 16;
        this.size = 0
        this.buckets = new Array(16).fill(null);
        this.load_capacity = 0.75
    }

    hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity
    }
    return hashCode;
    }
    
    set(key, value) {
    let hashedKey = this.hash(key);

    if (this.buckets[hashedKey] != null) {
        let cur = this.buckets[hashedKey];
        
        while (cur != null) {
            if (cur.key == key) {
                cur.val = value; // Update value if key already exists
                return;
            }
            if (cur.next == null) {
                cur.next = new Node(key, value);
                this.size += 1; // Increment size for new entry
                break;
            }
            cur = cur.next;
        }
    } else {
        this.buckets[hashedKey] = new Node(key, value);
        this.size += 1; // Increment size for new entry
    }

    if (this.size / this.capacity > this.load_capacity) {
        this.redistributeTable();
    }
}

    redistributeTable() {
        let newCapacity = this.capacity * 2;
        this.capacity = newCapacity
        let newBuckets = new Array(newCapacity).fill(null);

        for (let i = 0; i < this.capacity; i++) {
            let cur = this.buckets[i];
            while (cur != null) {
                let newHashedKey = this.hash(cur.key);
                if (newBuckets[newHashedKey] != null) {
                    let newCur = newBuckets[newHashedKey];
                    while (newCur.next != null) {
                        newCur = newCur.next;
                    }
                    newCur.next = new Node(cur.key, cur.val);
                } else {
                    newBuckets[newHashedKey] = new Node(cur.key, cur.val);
                }
                cur = cur.next;
            }
        }

        this.buckets = newBuckets;
        this.capacity = newCapacity;
    }

    get(key) {
        let hashedKey = this.hash(key);
        let cur = this.buckets[hashedKey];

        while (cur != null) {
            if (cur.key == key) {
                return cur.val;
            }
            cur = cur.next;
        }
        return null;
    }

    has(key){
        let hashedKey = this.hash(key)
        let cur = this.buckets[hashedKey];
        while (cur != null){
        if (this.buckets[hashedKey].next != null){
            return true
        }
        cur = cur.next}
        return false

    }

    remove(key) {
        let hashedKey = this.hash(key);
    
        let cur = this.buckets[hashedKey];
        let prev = null;
    
        while (cur != null) {
            if (cur.key === key) {
                if (prev == null) {
                    // Removing the head node in the bucket if we want to remove the first node
                    this.buckets[hashedKey] = cur.next;
                } else {
                    prev.next = cur.next;
                }
                this.size--;
                return true;
            }
            prev = cur;
            cur = cur.next;
        }
        return false
    }
    
    length(){
        return this.size
    }
    clear(){
        this.buckets = new Array(16).fill(null);
        this.size = 0;
        this.capacity = 16;
    }
    keys(){
        let vals = []
        for(let i = 0; i < this.capacity; i++){
            let cur = this.buckets[i];
            
            while (cur != null){
            
                vals.push(cur.key)
                cur = cur.next
            }
        }
        return vals
    }
    values(){
        let vals = []
        for(let i = 0; i < this.capacity; i++){
            let cur = this.buckets[i];
            while (cur != null){
        
                vals.push(cur.val)
                cur = cur.next
            }
        }
        return vals
    }
    entries(){
        let vals = []
        for(let i = 0; i < this.capacity; i++){
            let cur = this.buckets[i];
       
            while (cur != null){
             
                vals.push([cur.key, cur.val])
                cur = cur.next
            }
        }
        return vals
    }

}

const test = new HashMap()

test.set('apple', 'red')
 test.set('banana', 'yellow')
 test.set('carrot', 'orange')
 test.set('dog', 'brown')
 test.set('elephant', 'gray')
 test.set('frog', 'green')
 test.set('grape', 'purple')
 test.set('hat', 'black')
 test.set('ice cream', 'white')
 test.set('jacket', 'blue')
 test.set('kite', 'pink')
 test.set('lion', 'golden')

// has(key) takes a key as an argument and returns true or false based on whether or not the key is in the hash map.

// remove(key) takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.

// length() returns the number of stored keys in the hash map.

// clear() removes all entries in the hash map.

// keys() returns an array containing all the keys inside the hash map.

// values() returns an array containing all the values.

// entries() returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]