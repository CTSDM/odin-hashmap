export default class Node {
    constructor(value = null, key = null) {
        this.value = value;
        this.key = key;
        this.nextNode = null;
    }

    set value(newValue) { this._value = newValue; }
    set key(newKey) { this._key = newKey; }
    set next(nextNode) { this._nextNode = nextNode; }
    get value() { return this._value; }
    get key() { return this._key; }
    get next() { return this._nextNode; }
}
