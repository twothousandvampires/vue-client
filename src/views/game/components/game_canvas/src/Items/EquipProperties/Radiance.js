import EquipProperty from './EquipProperty'
import RadianceStatus from "../../Status/Radiance/RadianceStatus";

export default class Radiance extends EquipProperty{
    constructor(template, item) {
        super(template, item);
    }
    equip(player){
        if(this.item.requared_slot === this.item.slot){
            player.newStatus(new RadianceStatus(), this)
        }
    }

    unequip(player){
        if(this.item.requared_slot === this.item.slot){
            player.status.forEach((v, k) => {
                if(v.source === this) player.status.delete(k)
            })
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