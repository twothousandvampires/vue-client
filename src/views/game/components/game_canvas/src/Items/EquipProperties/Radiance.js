import EquipProperty from './EquipProperty'
import RadianceStatus from "../../Status/Radiance/RadianceStatus";

export default class Radiance extends EquipProperty{
    constructor(template, item) {
        super(template, item);
        this.requared_slot = 5
    }
    equip(player){
        if(this.requared_slot === this.item.slot){
            player.newStatus(new RadianceStatus(this.getTotalValue()), this, true)
        }
    }

    unequip(player){
        if(this.requared_slot === this.item.slot){
            player.status.forEach((v, k) => {
                if(v.source === this) player.status.delete(k)
            })
        }
    }

    getDescription(){
        if(this.requared_slot === this.item.slot || this.item.slot > 8){
            return 'deals '+ this.getTotalValue() +' magic damage every round'
        }
        else {
            return ''
        }
    }

    getTotalValue(){
        let result = this.value
        let effect = this.item.inc_effect

        result = Math.floor(result * (1 + effect / 100))

        if(this.item.increased_by_column) {
            result += Math.floor(this.value * 0.2)
        }

        if(this.item.increased_by_row){
            result += Math.floor(this.value *  0.2)
        }

        return result
    }
}