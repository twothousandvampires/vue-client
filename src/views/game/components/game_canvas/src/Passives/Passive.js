export default class Passive{
    static img = {
        'armored' : 'armored_passive.png',
        'light armor' : 'light_armour_passive.png',
        'might' : 'might_passive.png',
        'intuition' : 'intuition_passive.png',
        'lust for murder' : 'lust_of_murder_passive.png',
        'healing shield' : 'healing_shield_passive.png',
        'gluttony' : 'gluttony_passive.png',
        'block technique' : 'block_technique_passive.png',
        'strong flesh' : 'strong_flesh_passive.png',
        'stamina' : 'stamina_passive.png',
        'recovery weapon' : 'recovery_weapon_passive.png'
    }
    constructor(template) {
        this.id = template.id
        this.name = template.name
        this.level = template.level
        this.img = Passive.img[this.name]
        this.stat = template.stat
        this.exp_cost = template.exp_cost
        this.add_per_level = template.add_per_level
        this.description = template.description
    }

    getDescription(){
        if(!this.level){
            this.level = 1
        }
        let result = ``
        result += `${this.name} \n`
        result += `level: ${this.level} \n`
        result += `${this.description} (${this.level * this.add_per_level})\n`
        result += `exp needed to upgrade: ${this.level * this.exp_cost}`

        return result
    }
}