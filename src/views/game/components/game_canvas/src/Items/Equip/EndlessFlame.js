import Equip from "../Equip";

export default class EndlessFlame extends Equip{
    constructor(template) {
        super(template);
        this.img_path = '/src/assets/img/icons/items/acces/endless_flame.gif'
        this.requared_slot = 5
    }
}