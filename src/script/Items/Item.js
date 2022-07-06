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

        for(let i = 1; i <= this.property_count; i++){
            this.props.push({
               name : template[i + '_property_name'],
               stat : template[i + '_property_stat'],
               value : template[i + '_property_value'],
            })
        }

    }

    getDescription(){
        let result = ``
        this.props.forEach(elem => {
            result += elem.name + ' - ' + elem.value + (elem.name.indexOf('adds') ? '%' : '') + `\n`
        })
        return result
    }

    equip(player){
        this.props.forEach(elem => {
            player[elem.stat] ? player[elem.stat] += +elem.value : player[elem.stat] = +elem.test
        })
    }

    unequip(player){
        this.props.forEach(elem => {
            player[elem.stat] -= +elem.value
        })
    }
}