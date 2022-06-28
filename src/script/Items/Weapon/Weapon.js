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

        this.base_props = new Map()
        this.local_props = new Map()
        this.props = new Map()

        this.increased_weapon_damage = 0
        this.add_damage = 0

        for(let prop in body.props){
            let property  = body.props[prop]
            switch (property.type){
                case 'local':
                    this.local_props.set(property.name, property.value)
                    break;
                case 'global':
                    this.props.set(property.name, property.value)
                    break;
                case 'base':
                    this.base_props.set(property.name, property.value)
                    break;
            }
        }

        this.min_damage += this.local_props.has('add_damage') ? +this.local_props.get('add_damage') * 0.5 : 0
        this.max_damage += this.local_props.has('add_damage') ? +this.local_props.get('add_damage') * 1.5 : 0

        this.min_damage = Math.floor(this.min_damage * (1 + (this.local_props.has('increased_weapon_damage') ? this.local_props.get('increased_weapon_damage') : 0) / 100) )
        this.max_damage = Math.floor(this.max_damage * (1 + (this.local_props.has('increased_weapon_damage') ? this.local_props.get('increased_weapon_damage') : 0) / 100) )

    }

    getDescription(){

        let result = `${this.min_damage} - ${this.max_damage}\n`

        for(let prop of this.base_props.keys()){
            result += prop + ' - ' +  this.base_props.get(prop) + '\n'
        }
        for(let prop of this.local_props.keys()){
            result += prop + ' - ' +  this.local_props.get(prop) + '\n'
        }
        for(let prop of this.props.keys()){
            result += prop + ' - ' +  this.props.get(prop) + '\n'
        }
        return result

    }

    equip(player){
        for(let prop of this.base_props.keys()){
            player[prop] ? player[prop] += +this.base_props.get(prop) : player[prop] = +this.base_props.get(prop)
        }
        for(let prop of this.props.keys()){
            player[prop] ? player[prop] += +this.props.get(prop) : player[prop] = +this.props.get(prop)
        }
    }

    unequip(player){
        for(let prop of this.base_props.keys()){
            player[prop] -= +this.base_props.get(prop)
        }
        for(let prop of this.props.keys()){
            player[prop] -= +this.props.get(prop)
        }
    }
}