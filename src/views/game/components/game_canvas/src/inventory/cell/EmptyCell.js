import Cell from "../cell/Cell";

export default class EmptyCell extends Cell{

    constructor(i) {
        super(i)
        this.cell_empty = Cell.CELL_EMPTY
    }

    equip(p){

    }
    unequip(p){

    }
}