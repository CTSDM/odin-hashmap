import LinkedList from './linkedList.mjs'

// Our hash map will only accomodate strings as keys
// It does not handle collision
export default class HashMap {
    constructor() {
        this.size = 16;
        this.currentCapacity = 0;
        this.loadFactor = 0.75;
        this.map;
        this.createMap();
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; ++i) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.size;
        }

        return hashCode;
    }

    set(key, value) {
        // Every time we add a new element we need to check the following:
        // Will the new currentCapacity be greater than the threshold set by loadFactor?
        if (this.currentCapacity + 1 > Math.floor(this.size * this.loadFactor)) {
            this.remap();
        }
        // Each 'bucket' of our hash map will be composed by a linked list
        // We only create a new linked list if the 'bucket' is empty
        const hashCode = this.hash(key);
        if (this.map[hashCode] === null) {
            let linkedList = new LinkedList();
            linkedList.append(key, value);
            this.map[hashCode] = linkedList;
            ++this.currentCapacity;
        } else {
            // We first check if the new key already exists in the linked list
            // if it exists we overwrite the node
            // if it doesn't exist we append it
            let indexKey = this.map[hashCode].findKey(key);
            if (indexKey === null) {
                this.map[hashCode].append(key, value);
                ++this.currentCapacity;
            } else {
                this.map[hashCode].at(indexKey).value = value;
            }
        }
    }

    remap() {
        const currentEntries = this.entries();
        this.size *= 2;
        this.currentCapacity = 0;
        this.createMap();
        currentEntries.forEach(function(pair) {
            this.set(pair[0], pair[1]);
        }, this);
    }

    get(key) {
        const hashCode = this.hash(key);
        if (this.map[hashCode] === null)
            return null;
        let linkedList = this.map[hashCode];
        let keyIndex = linkedList.findKey(key);
        if (keyIndex === null)
            return null
        return this.map[hashCode].at(keyIndex).value;
    }

    has(key) {
        const hashCode = this.hash(key);
        if (this.map[hashCode] === null)
            return false;
        let linkedList = this.map[hashCode];
        let keyIndex = linkedList.findKey(key);
        if (keyIndex === null)
            return false;
        return true;
    }

    remove(key) {
        const hashCode = this.hash(key);
        if (this.map[hashCode] === null)
            return false;
        let linkedList = this.map[hashCode];
        let keyIndex = linkedList.findKey(key);
        if (keyIndex === null)
            return false;
        linkedList.removeAt(keyIndex);
        --this.currentCapacity;
        return true;
    }

    createMap() {
        this.map = new Array(this.size);
        for (let i = 0; i < this.size; ++i)
            this.map[i] = null;
    }

    length() {
        return this.currentCapacity;
    }

    keys() {
        let arrKeys = [];
        for (let i = 0; i < this.size; ++i)
            if (this.map[i] !== null)
                arrKeys = arrKeys.concat(this.map[i].getKeys());
        return arrKeys;
    }

    values() {
        let arrValues = [];
        for (let i = 0; i < this.size; ++i)
            if (this.map[i] !== null)
                arrValues = arrValues.concat(this.map[i].getValues());
        return arrValues;
    }

    entries() {
        let arrEntries = [];
        for (let i = 0; i < this.size; ++i)
            if (this.map[i] !== null)
                arrEntries = arrEntries.concat(this.map[i].getEntries());
        return arrEntries;
    }
}
