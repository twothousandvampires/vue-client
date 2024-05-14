import EquipProperty from './EquipProperty'
import LeafArmour from "../../Status/LeafArmour/LeafArmour";

export default class LifeArmourOnBlock extends EquipProperty{
    constructor(template, item) {
        super(template, item);
    }

    equip(player){
        if(this.item.requared_slot === this.item.slot){
            player.blockTriggers.push(this)
        }
    }

    unequip(player){
        if(this.item.requared_slot === this.item.slot){
            player.blockTriggers.splice(player.blockTriggers.indexOf(this),1)
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

    trigger(player){
        if(Math.random() <= this.value){
            player.newStatus(new LeafArmour(), this)
        }
    }
}