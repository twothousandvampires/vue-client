import EmptyCell from "./EmptyCell";
import config from '/config';

export default class EmptyAccessoryCell extends EmptyCell{
    constructor(cell_id) {
        super(cell_id);
        this.img_path = config.img_url + 'empty_accessory.png'
        this.description =  'Empty accessory cell.'
    }
}