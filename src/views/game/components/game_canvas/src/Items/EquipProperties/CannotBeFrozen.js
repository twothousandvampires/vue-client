import EquipProperty from "./EquipProperty";

export default class CannotBeFrozen extends EquipProperty{
    constructor(template, item) {
        super(template, item)
    }

    equip(player){
        if(this.item.requared_slot === this.item.slot){
            player.cannot_be_frozen = 1
        }
    }

    unequip(player){
        if(this.item.requared_slot === this.item.slot){
            player.cannot_be_frozen = 0
        }
    }

    getDescription(){
        if(this.item.requared_slot === this.item.slot || this.item.slot > 8){
            return this.name + `\n`
        }
        else {
            return ''
        }
    }
}