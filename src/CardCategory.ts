class CardCategory {
    constructor(
        private _name: string,
        private _size: number
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
}

export default CardCategory;
