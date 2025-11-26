class CardCategory {
    constructor(
        private _name: string,
        private _size: number,
        private _addToDeckSize: boolean = true
    ) {}
    get name() {
        return this._name;
    }
    set name(name: string) {
        this._name = name;
    }
    get size() {
        return this._size;
    }
    set size(size: number) {
        this._size = size;
    }
    get addToDeckSize() {
        return this._addToDeckSize;
    }
    set addToDeckSize(addToDeckSize: boolean) {
        this._addToDeckSize = addToDeckSize;
    }
}

export default CardCategory;
