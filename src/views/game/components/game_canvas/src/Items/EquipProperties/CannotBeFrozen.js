import EquipProperty from "./EquipProperty";

export default class CannotBeFrozen extends EquipProperty{
    constructor(template, item) {
        super(template, item)
        this.requared_slot = 5
    }

    equip(player){
        if(this.requared_slot === this.item.slot){
            player.cannot_be_frozen = 1
        }
    }

    unequip(player){
        if(this.requared_slot === this.item.slot){
            player.cannot_be_frozen = 0
        }
    }

    getDescription(){
        if(this.requared_slot === this.item.slot || this.item.slot > 8){
            return this.name + `\n`
        }
        else {
            return ''
        }
    }
}