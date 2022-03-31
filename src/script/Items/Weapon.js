export default class Weapon{
    constructor(template){
        this.increased_weapon_damage = 0
        this.add_damage = [0,0]
        this.props = []
        this.prop_stats = []
        for(let prop in template){
            if(!prop.includes('property')){
                this[prop] = template[prop]
            }
            else if(template[prop]){
                let p = template[prop].split(';')
                let type = p[0]
                let range = p[1]
                let affect = p[2]
                let value = range  === 'between' ? p[3].split('/') : p[3]
                if(type === 'local'){
                    if(range === 'between'){
                        this[affect][0] += +value[0]
                        this[affect][1] += +value[1]
                        this.props.push(affect.replaceAll('_', ' ') + ' - ' + value[0] + ' - ' + value[1])
                    }
                    else {
                        this[affect] += +value
                        this.props.push(affect.replaceAll('_', ' ') + ' - ' + value)
                    }
                }
                else {
                    this.prop_stats.push([affect,value])
                    this.props.push(affect.replaceAll('_', ' ') + ' - ' + value)
                }
            }
        }
        this.min_damage = template.min_damage + this.add_damage[0]
        this.max_damage = template.max_damage + this.add_damage[1]

        this.min_damage = Math.floor(this.min_damage * (1 + this.increased_weapon_damage / 100))
        this.max_damage = Math.floor(this.max_damage * (1 + this.increased_weapon_damage / 100))
    }

    getDiscription(){
        let result = `${this.min_damage} - ${this.max_damage}\n`
        this.props.forEach(elem => {
            result += elem + '\n'
        })
        return result
    }

    equip(player){
        this.prop_stats.forEach(elem => {
            player[elem[0]] += +elem[1]
        })
        player.calcStats()
    }

    unequip(player){
        this.prop_stats.forEach(elem => {
            player[elem[0]] -= +elem[1]
        })
        player.calcStats()
    }
}