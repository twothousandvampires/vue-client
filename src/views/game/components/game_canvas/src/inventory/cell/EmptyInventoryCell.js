import EmptyCell from "./EmptyCell";

export default class EmptyInventoryCell extends EmptyCell{
    constructor(cell_id) {
        super(cell_id);
        this.img_path = '/src/assets/img/icons/items/misc/empty_shield.png'
        this.description =  'Empty inventory cell.'
    }
}