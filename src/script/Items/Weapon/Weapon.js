export default class Weapon{
    constructor(template){

        console.log(template)

        this.item_type = template.item_type
        this.item_class = template.item_class
        this.item_name = template.item_name

        this.item_stats = JSON.parse(template.item_body)

        console.log(this.item_stats)

        this.increased_weapon_damage = 0
        this.add_damage = 0

        this.discription = ''

        for(let prop in this.item_stats.props){
            let property  = this.item_stats.props[prop]
            switch (property.type){
                case 'local':
                    this[property.name] += parseInt(property.value)
                    break;
                case 'global':
                    break;
            }
        }
        this.min_damage = template.min_damage + this.add_damage * 0.5
        this.max_damage = template.max_damage + this.add_damage * 1.5

        this.min_damage = Math.floor(this.min_damage * (1 + this.increased_weapon_damage / 100))
        this.max_damage = Math.floor(this.max_damage * (1 + this.increased_weapon_damage / 100))

        this.discription = this.getDiscription()
    }

    getDiscription(){
        // let result = `${this.min_damage} - ${this.max_damage}\n`
        // this.base_props.forEach(elem => {
        //     result += elem[0] + ' - ' + elem[1] + '\n'
        // })
        // this.local_props.forEach(elem => {
        //     result += elem[0] + ' - ' + elem[1] + '\n'
        // })
        // this.props.forEach(elem => {
        //     result += elem[0] + ' - ' + elem[1] + '\n'
        // })
        // return result
    }

    equip(player){
        this.base_props.forEach(elem => {
            player[elem[0]] ? player[elem[0]] += +elem[1] : player[elem[0]] = elem[1]
        })
        this.props.forEach(elem => {
            player[elem[0]] ? player[elem[0]] += +elem[1] : player[elem[0]] = elem[1]
        })
    }

    unequip(player){
        this.base_props.forEach(elem => {
            player[elem[0]] -= +elem[1]
        })
        this.props.forEach(elem => {
            player[elem[0]] -= +elem[1]
        })
    }
}