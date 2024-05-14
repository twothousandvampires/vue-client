export default class Weapon{
    constructor(template, body){

        this.id = template.id

        this.char_id = template.char_id
        this.slot = template.slot
        this.item_type = template.item_type
        this.item_class = template.item_class
        this.item_name = template.item_name

        this.attack_speed = body.attack_speed
        this.attack_range = body.attack_range
        this.crit_chance = body.crit_chance
        this.img_path = body.img_path
        this.min_damage = body.min_damage
        this.max_damage = body.max_damage

        this.base_props = {}
        this.local_props = {}
        this.props = {}

        this.increased_weapon_damage = 0
        this.add_damage = 0

        for(let prop in body.props){
            let property  = body.props[prop]
            switch (property.type){
                case 'local':
                    this.local_props[property.name]= property.value
                    break;
                case 'global':
                    this.props[property.name] = property.value
                    break;
                case 'base':
                    this.base_props[property.name] = property.value
                    break;
            }
        }

        this.min_damage += this.local_props['add_damage'] ? +this.local_props['add_damage'] * 0.5 : 0
        this.max_damage += this.local_props['add_damage'] ? +this.local_props['add_damage'] * 1.5 : 0

        this.min_damage = Math.floor(this.min_damage * (1 + (this.local_props['increased_weapon_damage'] ? this.local_props['increased_weapon_damage'] : 0) / 100) )
        this.max_damage = Math.floor(this.max_damage * (1 + (this.local_props['increased_weapon_damage'] ? this.local_props['increased_weapon_damage'] : 0) / 100) )

    }

    getDescription(){

        let result = `${this.min_damage} - ${this.max_damage}\n`

        for(let prop in this.base_props){
            result += prop + ' - ' +  this.base_props[prop] + '\n'
        }
        for(let prop in this.local_props){
            result += prop + ' - ' +  this.local_props[prop] + '\n'
        }
        for(let prop in this.props){
            result += prop + ' - ' +  this.props[prop] + '\n'
        }
        return result

    }

    equip(player){
        for(let prop in this.base_props){
            player[prop] ? player[prop] += +this.base_props[prop] : player[prop] = +this.base_props[prop]
        }
        for(let prop in this.props){
            player[prop] ? player[prop] += +this.props[prop] : player[prop] = +this.props[prop]
        }
    }

    unequip(player){
        for(let prop in this.base_props){
            player[prop] -= +this.base_props[prop]
        }
        for(let prop in this.props){
            player[prop] -= +this.props[prop]
        }
    }
}