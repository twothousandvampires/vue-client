import Functions from "../../GameFunctions";

export default class EquipProperty{
    constructor(template, item) {
        this.stat = template.stat
        this.name = template.name
        this.value = template.value
        this.item = item
        this.inc_type = template.inc_type
        this.sub_type = template.sub_type
    }

    equip(){

    }

    unequip(){

    }

    getDescription(){

        let inc = 0
        let total = 0
        if(this.sub_type == 1){
            if(this.inc_type == 1){
                total = -this.item.penalty + this.item.increased_by_column + this.item.increased_by_row
            }
            else if(this.inc_type == 2){
                total = -this.item.penalty - this.item.increased_by_column - this.item.increased_by_row
            }
        }
        else if(this.sub_type == 2){
            if(this.inc_type == 1){
                total = -this.item.penalty - this.item.increased_by_column - this.item.increased_by_row
            }
            else if(this.inc_type == 2){
                total = -this.item.penalty + this.item.increased_by_column + this.item.increased_by_row
            }
        }

        if(total < 0){
            inc = Functions.reducedByPercent(this.value, -total)
        }
        else {
            inc = Functions.increasedByPercent(this.value, total)
        }

        return this.name + ' - ' + Math.floor(inc) + `\n`
    }
}