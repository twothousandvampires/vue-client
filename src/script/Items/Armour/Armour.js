import Functions from "../../GameFunctions";

export default class Armour{
    constructor(template, body){

        this.id = template.id

        this.char_id = template.char_id
        this.slot = template.slot
        this.item_type = template.item_type
        this.item_class = template.item_class
        this.item_name = template.item_name
        this.img_path = body.img_path

        this.armour = body.armour
        this.evade = body.evade
        this.resist = body.resist
        this.block = body.block
        this.block_count = body.block_count

        this.base_props = {}
        this.local_props = {}
        this.props = {}


        for(let prop in body.props){
            let property  = body.props[prop]
            switch (property.type){
                case 'local':
                    this.local_props[property.name] = property.value
                    break;
                case 'global':
                    this.props[property.name] = property.value
                    break;
                case 'base':
                    this.base_props[property.name] = property.value
                    break;
            }
        }

        this.armour += this.local_props['add_armour'] ? +this.local_props['add_armour'] : 0

        if(this.armour && this.local_props['increased_defenses']){
            this.armour = Functions.increasedByPercent(this.armour, this.local_props['increased_defenses'])
        }

        this.evade += this.local_props['add_evade'] ? +this.local_props['add_evade'] : 0

        if(this.evade && this.local_props['increased_defenses']){
            this.evade = Functions.increasedByPercent(this.evade, this.local_props['increased_defenses'])
        }

        this.resist += this.local_props['add_resist'] ? +this.local_props['add_resist'] : 0

        if(this.resist && this.local_props['increased_defenses']){
            this.resist = Functions.increasedByPercent(this.resist, this.local_props['increased_defenses'])
        }

    }

    getDescription(){
        let result = ``
        if(this.armour){
            result += `armour - ${this.armour}` + '\n'
        }
        if(this.evade){
            result += `evade - ${this.evade}` + '\n'
        }
        if(this.resist){
            result += `resist - ${this.resist}` + '\n'
        }
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

        player.armour ? player.armour += this.armour : player.armour = this.armour
        player.evade ? player.evade += this.evade : player.evade = this.evade
        player.resist ? player.resist += this.resist : player.resist = this.resist

    }

    unequip(player){
        for(let prop in this.base_props){
            player[prop] -= +this.base_props[prop]
        }
        for(let prop in this.props){
            player[prop] -= +this.props[prop]
        }
        player.armour -= this.armour
        player.evade -= this.evade
        player.resist -= this.resist
    }
}