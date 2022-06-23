export default class Weapon{
    constructor(template){
        this.increased_weapon_damage = 0
        this.add_damage = 0
        this.base_props = [];
        this.local_props = []
        this.props = []
        this.discription = ''
        for(let prop in template){
            if(!prop.includes('property')){
                this[prop] = template[prop]
            }
            else if(template[prop]){
                let p = template[prop].split(';')
                let type = p[0]
                let affect = p[1]
                let value = p[2]
                if(type === 'local'){
                    this[affect] += +value
                    this.local_props.push([affect, value])
                }
                else if(type === 'base'){
                    this.base_props.push([affect, value])
                }
                else{
                    this.props.push([affect,value])
                }
            }
        }
        this.min_damage = template.min_damage + this.add_damage * 0.5
        this.max_damage = template.max_damage + this.add_damage * 1.5

        this.min_damage = Math.floor(this.min_damage * (1 + this.increased_weapon_damage / 100))
        this.max_damage = Math.floor(this.max_damage * (1 + this.increased_weapon_damage / 100))

        this.discription = this.getDiscription()
    }

    getDiscription(){
        let result = `${this.min_damage} - ${this.max_damage}\n`
        this.base_props.forEach(elem => {
            result += elem[0] + ' - ' + elem[1] + '\n'
        })
        this.local_props.forEach(elem => {
            result += elem[0] + ' - ' + elem[1] + '\n'
        })
        this.props.forEach(elem => {
            result += elem[0] + ' - ' + elem[1] + '\n'
        })
        return result
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