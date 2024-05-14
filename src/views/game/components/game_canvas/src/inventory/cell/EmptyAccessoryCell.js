import EmptyCell from "./EmptyCell";

export default class EmptyAccessoryCell extends EmptyCell{
    constructor(cell_id) {
        super(cell_id);
        this.img_path = '/src/assets/img/icons/items/misc/empty_accessory.png'
        this.description =  'Empty accessory cell.'
    }
}