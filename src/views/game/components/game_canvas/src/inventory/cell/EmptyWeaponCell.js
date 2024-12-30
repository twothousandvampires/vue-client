import EmptyCell from "./EmptyCell";
import config from '/config';
export default class EmptyWeaponCell extends EmptyCell{
    constructor(cell_id) {
        super(cell_id);
         this.img_path = config.img_url + 'empty_weapon.png'
        this.description =  'Empty weapon cell.'
    }
}