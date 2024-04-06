import Node from './node.mjs'

// Our hash map will only accomodate strings as keys
// It does not handle collision
export default class HashMap {
    constructor() {
        this.size = 16;
        this.currentCapacity = 0;
        this.loadFactor = 0.75;
        this.map = new Array(this.size);
        this.clear();
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
        let node = new Node(key, value);
        const hashCode = this.hash(key);
        this.map[hashCode] = node;
    }

    get(key) {
        const hashCode = this.hash(key);
        if (this.map[hashCode] === null)
            return null;
        return this.map[hashCode].value;
    }

    has(key) {
        const hashCode = this.hash(key);
        if (this.map[hashCode] === null)
            return false;
        return true;
    }

    remove(key) {
        const hashCode = this.hash(key);
        if (this.map[hashCode] === null)
            return false;
        this.map[hashCode] = null;
        return true;
    }

    clear() {
        for (let i = 0; i < this.size; ++i)
            this.map[i] = null;
    }

    length() {
        // How many keys are stored in our hash map
        return this.map.reduce(function(total, b) {
            if (b === null)
                return total;
            return ++total;
        }, 0);
    }

    keys() {
        const arrKeys = [];
        for (let i = 0; i < this.size; ++i)
            if (this.map[i] !== null)
                arrKeys.push(this.map[i].key);
        return arrKeys;
    }

    values() {
        const arrValues = [];
        for (let i = 0; i < this.size; ++i)
            if (this.map[i] !== null)
                arrValues.push(this.map[i].value);
        return arrValues;
    }

    entries() {
        const arrEntries = [];
        for (let i = 0; i < this.size; ++i)
            if (this.map[i] !== null)
                arrEntries.push([this.map[i].key, this.map[i].value]);
        return arrEntries;
    }
}
