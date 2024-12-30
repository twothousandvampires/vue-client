import EmptyCell from "./EmptyCell";
import config from '/config';

export default class EmptyArmourCell extends EmptyCell{
    constructor(cell_id) {
        super(cell_id);
        this.img_path = config.img_url + 'empty_armour.png'
        this.description =  'Empty armour cell.'
    }
}