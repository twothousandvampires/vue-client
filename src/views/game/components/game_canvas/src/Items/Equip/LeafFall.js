import Equip from "../Equip";
export default class LeafFall extends Equip{
    constructor(template) {
        super(template)
        this.img_path = '/src/assets/img/icons/items/armour/leaf_fall.gif'
        this.requared_slot = 4
    }
}