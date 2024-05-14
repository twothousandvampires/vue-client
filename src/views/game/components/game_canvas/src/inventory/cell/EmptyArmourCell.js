import EmptyCell from "./EmptyCell";

export default class EmptyArmourCell extends EmptyCell{
    constructor(cell_id) {
        super(cell_id);
        this.img_path = '/src/assets/img/icons/items/misc/empty_armour.png'
        this.description =  'Empty armour cell.'
    }
}