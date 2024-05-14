export default class Cell{

    static CELL_EMPTY = 1
    static CELL_NOT_EMPTY = 2

    constructor(cell_id) {
        this.slot = cell_id
    }

    getImagePath(){
        return this.img_path
    }

    getDescription(){
        return this.description
    }
}