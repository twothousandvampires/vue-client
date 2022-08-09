import Functions from "../GameFunctions";

export default class Item{
    constructor(template) {

        console.log(template)

        this.name = template.name
        this.class = template.class
        this.subclass = template.subclass
        this.type = template.type
        this.char_id = template.char_id
        this.id = template.id
        this.slot = template.slot
        this.quality = template.quality
        this.image_path = template.img_path
        this.props = []


        this.increased_by_row = 0
        this.increased_by_column = 0
        this.class_penalty = 0
        this.subclass_penalty = 0

        this.equiped = false


        template.properties.forEach(elem => {
            this.props.push({
                name : elem.name,
                stat : elem.stat,
                value : elem.value,
            })
        })
    }

    getTotal(){
        return this.increased_by_column + this.increased_by_row - this.subclass_penalty- this.class_penalty
    }

    getDescription(){
        let total = this.getTotal()
        let result = ``
        result += `class - ${this.class} \n`
        result += `subclass - ${this.subclass} \n`
        result += `----------------------- \n`

        this.props.forEach(elem => {
            let value = total ? Functions.increasedByPercent(elem.value, total) : elem.value
            result += elem.name + ' - ' + value + (elem.name.indexOf('adds') ? '%' : '') + `\n`
        })

        if(this.increased_by_row){
            result += `increased on row by ${this.increased_by_row} \n`
        }
        if(this.increased_by_column){
            result += `increased on column by ${this.increased_by_column} \n`
        }
        if(this.class_penalty){
            result += `reduced on wrong class by ${this.class_penalty} \n`
        }
        if(this.subclass_penalty){
            result += `reduced on wrong subclass by ${this.subclass_penalty} \n`
        }
        return result
    }

    equip(player){
        let total = this.getTotal()
        this.props.forEach(elem => {
            let value = total ? Functions.increasedByPercent(elem.value, total) : elem.value
            if(player[elem.stat]){
                player[elem.stat] = +(+player[elem.stat] + +value).toFixed(2)
            }
            else {
                player[elem.stat] = value
            }
        })
        this.equiped = true
    }

    unequip(player){
        let total = this.getTotal()
        this.props.forEach(elem => {
            let value = total ? Functions.increasedByPercent(elem.value, total) : elem.value
            player[elem.stat] = +(+player[elem.stat] - +value).toFixed(2)
        })
        this.equiped = false
    }
}