import Equip from "../Equip";

export default class DreamFragment extends Equip{
    constructor(template) {
        super(template)
        this.img_path = '/src/assets/img/icons/items/acces/dream_fragment.gif'
        this.requared_slot = 5
    }
}