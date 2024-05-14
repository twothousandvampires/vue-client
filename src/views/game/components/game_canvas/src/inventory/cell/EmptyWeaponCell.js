import EmptyCell from "./EmptyCell";

export default class EmptyWeaponCell extends EmptyCell{
    constructor(cell_id) {
        super(cell_id);
        this.img_path = '/src/assets/img/icons/items/misc/empty_weapon.png'
        this.description =  'Empty weapon cell.'
    }
}