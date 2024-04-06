export default class Node {
    constructor(key = null, value = null) {
        this.key = key;
        this.value = value;
        this.nextNode = null;
    }

    set value(newValue) { this._value = newValue; }
    set key(newKey) { this._key = newKey; }
    set next(nextNode) { this._nextNode = nextNode; }
    get value() { return this._value; }
    get key() { return this._key; }
    get next() { return this._nextNode; }
}
