export default class Armour{
    constructor(template){
        this.increased_armour = 0
        this.increased_energy_regen = 0
        this.add_spell_damage = 0
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

        this.armour = Math.floor(this.armour * (1 + this.increased_armour / 100))
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
        player.armour += this.armour
    }

    unequip(player){
        this.prop_stats.forEach(elem => {
            player[elem[0]] -= +elem[1]
        })
        player.armour -= this.armour
    }
}