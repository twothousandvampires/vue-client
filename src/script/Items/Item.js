import Functions from "../GameFunctions";

export default class Item{
    constructor(template) {
        this.name = template.name
        this.class = template.class
        this.type = template.type
        this.char_id = template.char_id
        this.id = template.id
        this.slot = template.slot
        this.quality = template.quality
        this.property_count = template.property_count
        this.image_path = template.img_path
        this.props = []


        this.increased_by_row = 0
        this.increased_by_column = 0

        this.equiped = false


        for(let i = 1; i <= this.property_count; i++){
            this.props.push({
               name : template[i + '_property_name'],
               stat : template[i + '_property_stat'],
               value :template[i + '_property_value'],
            })
        }

    }

    getDescription(){
        let total = this.increased_by_row + this.increased_by_column;
        let result = ``
        result += `class - ${this.class} \n`
        result += `type - ${this.type} \n`
        result += `----------------------- \n`

        this.props.forEach(elem => {
            let value = total ? Functions.increasedByPercent(elem.value, total) : elem.value
            result += elem.name + ' - ' + value + (elem.name.indexOf('adds') ? '%' : '') + `\n`
        })

        if(this.increased_by_row){
            result += `increased on row by 10% \n`
        }
        if(this.increased_by_column){
            result += `increased on column by 10% \n`
        }
        return result
    }

    equip(player){
        let total = this.increased_by_row + this.increased_by_column
        this.props.forEach(elem => {
            let value = total ? Functions.increasedByPercent(elem.value, total) : elem.value
            player[elem.stat] ? player[elem.stat] += value : player[elem.stat] = value
        })
        this.equiped = true
    }

    unequip(player){
        let total = this.increased_by_row + this.increased_by_column
        this.props.forEach(elem => {
            let value = total ? Functions.increasedByPercent(elem.value, total) : elem.value
            player[elem.stat] -= value
        })
        this.equiped = false
    }
}