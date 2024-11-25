import EquipProperty from './EquipProperty'
import LeafArmour from "../../Status/LeafArmour/LeafArmour";

export default class LifeArmourOnBlock extends EquipProperty{
    constructor(template, item) {
        super(template, item);
        this.requared_slot = 4
    }

    equip(player){
        if(this.requared_slot === this.item.slot){
            player.blockTriggers.push(this)
        }
    }

    unequip(player){
        if(this.requared_slot === this.item.slot){
            player.blockTriggers.splice(player.blockTriggers.indexOf(this),1)
        }
    }

    getDescription(){
        if(this.requared_slot === this.item.slot || this.item.slot > 8){
            return Math.floor(this.value)
        }
        else {
            return ''
        }
    }

    trigger(player){
        if(Math.random() <= this.value/ 100){
            player.newStatus(new LeafArmour(), this)
        }
    }
}