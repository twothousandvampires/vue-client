import EquipProperty from './EquipProperty'
import Functions from "../../GameFunctions";

export default class MovementSpeed extends EquipProperty{
    constructor(template, item) {
        super(template, item);
    }

    getDescription(){

        let inc = 0
        let total = -this.item.penalty - this.item.increased_by_column - this.item.increased_by_row

        if(total < 0){
            inc = Functions.reducedByPercent(this.value, -total)
        }
        else {
            inc = Functions.increasedByPercent(this.value, total)
        }


        return this.name + ' - ' +inc/1000 + `\n`;

    }
}