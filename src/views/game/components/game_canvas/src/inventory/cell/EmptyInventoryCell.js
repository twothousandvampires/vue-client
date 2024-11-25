import EmptyCell from "./EmptyCell";

export default class EmptyInventoryCell extends EmptyCell{
    constructor(cell_id) {
        super(cell_id);
        this.img_path = false
        this.description =  'Empty inventory cell.'
    }
}