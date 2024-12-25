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
        'recovery weapon' : 'recovery_weapon_passive.png',
        'mind buffer' : 'mind_buffer_passive.png',
        'inner power' : 'inner_power_passive.png',
        'spiritual shield' : 'spiritual_shield_passive.png',
        'knowledge of weak points' : 'knowledge_of_weak_points_passive.png',
        'battery weapon' : 'battery_weapon_passive.png',
        'residual magic' : 'residual_magic_passive.png',
        'cave moth essence' : 'cave_moth_essence_passive.png',
        'increased potion effect' : 'increased_potion_effect_passive.png',
        'splitting' : 'splitting.png',
        'synthesis' : 'synthesis.png',
    }
    constructor(template, player) {
        this.id = template.id
        this.name = template.name
        this.level = template.level
        this.img = Passive.img[this.name]
        this.exp_cost = template.exp_cost
        this.stats = template.stats
        this.player = player
    }

    getStats(){
        if(!this.level){
            this.level = 1
        }
        let result = ''
        this.stats.forEach(element => {
            result += `${element.description}\n start value - ${element.start_value}\n add per level - ${element.add_per_level} \n total - ${element.start_value + Math.floor((this.level - 1) * element.add_per_level)} \n`
        });
        return result;
    }

    getDescription(){
        if(!this.level){
            this.level = 1
        }
        let result = ``
        result += `${this.name} \n`
        result += `level: ${this.level} \n`
        result += `${this.getStats()} \n`
        result += `exp needed to upgrade: ${this.level * this.exp_cost}`

        return result
    }
}