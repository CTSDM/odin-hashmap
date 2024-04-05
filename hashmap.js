// Our hash map will only accomodate strings as keys
class HashMap {
    constructor() {
        this.size = 16;
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
        const hashCode = this.hash(key);
        this.map[hashCode] = value;
    }

    get(key) {
        const hashCode = this.hash(key);
        if (this.map[hashCode] === null)
            return null;
        return this.map[hashCode];
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
}
