import EquipProperty from "./EquipProperty";
import Functions from "../../GameFunctions";

export default class EnergyRegeneration extends EquipProperty{
    constructor(template, item) {
        super(template, item)
    }

    getDescription(){
        let total = this.item.getTotal()
        return this.name + ' - ' + Math.floor(Functions.increasedByPercent(Math.abs(this.value), total))/1000 + `\n`
    }
}