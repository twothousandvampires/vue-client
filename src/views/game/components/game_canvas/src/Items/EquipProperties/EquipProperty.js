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

        let result = this.value
        let effect = this.item.inc_effect
        let penalty = this.item.penalty

        if(penalty){
            result = Math.floor(result * (1 - penalty / 100))
        }

        if(effect && this.sub_type === 1){
            result = Math.floor(result * (1 + effect / 100))
        }

        if(this.item.increased_by_column){
            if(this.sub_type === 1){
                result += Math.floor(this.value * 0.2)
            }
            else {
                result -= Math.floor(this.value  * 0.2)
            }

        }

        if(this.item.increased_by_row){
            if(this.sub_type === 1){
                result += Math.floor(this.value *  0.2)
            }
            else {
                result -= Math.floor(this.value *  0.2)
            }
        }

        return result
    }
}