// @flow

/*
LRU = Least Recently Used

LRU Caches are used for caches that you don't want to grow indefinitely.

When the cache is full, items that are the oldest should be ejected.

It should support the following operations:
- initialize with cache capacity, data
- get(key), return a value. This will need to check if the key exists, if it does we need to update the access list
- put(key, value)
 */

class NodeEntry {
    key: string;
    value: any;
    next: NodeEntry | null;
    prev: NodeEntry | null;
    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class lruCache {
    capacity: number; // LRU total capacity
    length: number; // doubly linked list length
    head: NodeEntry | null;
    tail: NodeEntry | null;
    _cacheMap: Map<string, NodeEntry>;
    constructor(capacity: number) {
        this.capacity = capacity;
        this.length = 0;
        this.head = null;
        this.tail = null;
        this._cacheMap = new Map();
    }

    // remove node at TAIL of linked list
    _pop(): NodeEntry | null {
        if (!this.length) {
            return null;
        } else {
            let nodeToRemove = this.tail;
            if (!this.tail) throw new Error('No tail node. Something went wrong.');

            if (this.length === 1) {
                this.head = null;
                this.tail = null;
            } else {
                this.tail = this.tail.prev;
                if (!this.tail || !nodeToRemove) throw new Error('Something went wrong');

                this.tail.next = null;
                nodeToRemove.prev = null;
            }
            if (!nodeToRemove) throw new Error('Something went wrong');
            this._cacheMap.delete(nodeToRemove.key);

            this.length -= 1;
            return nodeToRemove
        }
    }

    // add newNode to the HEAD of linked list
    _unshiftNode(newNode: NodeEntry) {
        // if list is empty: set head and tail to new node
        if (!this.length) {
            this.head = newNode;
            this.tail = newNode
        } else {
            if (this.length === this.capacity) {
                // cache is at capacity remove TAIL item
                this._pop()
            }

            let oldHeadNode = this.head;
            if (!oldHeadNode) throw new Error('Head is null. Something is wrong');

            oldHeadNode.prev = newNode;
            newNode.next = oldHeadNode;
            newNode.prev = null;

            this.head = newNode;
        }
        this.length += 1;
        this._cacheMap.set(newNode.key, newNode);
    }

    _markNodeAsUsed(entry: NodeEntry): NodeEntry | null {
        if (entry === this.head) {
            // already newest, so don't need to update linked list
            return null;
        } else if (entry === this.tail) {
            // handle special case of not having next

            // remove from tail, update tail.
            this._pop();

            // add to head
            this._unshiftNode(entry);
        } else {
            // node is in middle of the list

            // find middle node next, prev nodes
            let nextNode = entry.next;
            let prevNode = entry.prev;
            if (!nextNode || !prevNode) throw new Error('Node is not in middle. Something is wrong.');

            // doubly join nodes
            nextNode.prev = prevNode;
            prevNode.next = nextNode;

            // reduce length
            this.length -= 1;

            // add to head
            this._unshiftNode(entry)
        }
        return entry
    }

    // Public methods
    get(key: string): any {
        let entry = this._cacheMap.get(key);
        if (entry) {
            console.log(`Value for key "${key}" is ${entry.value}`);
            this._markNodeAsUsed(entry);
            return entry.value
        } else {
            throw new Error('')
        }
    };
    put(key: string, value: any) {
        let entry = this._cacheMap.get(key);
        if (entry) {
            entry.value = value;
            this._markNodeAsUsed(entry);
            console.log(`Updated key "${key}"`);
        } else {
            console.log(`Adding key "${key}"`);
            let newNodeEntry = new NodeEntry(key, value);
            this._unshiftNode(newNodeEntry);
        }
    }
}
module.exports = lruCache;