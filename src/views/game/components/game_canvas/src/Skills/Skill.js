import config from '/config.js'
export default class Skill {
    constructor(template, player) {
        this.player = player
        this.level = template.level
        this.id = template.id
        this.name = template.skill_name
        this.skill_type = template.skill_type
        this.can_create_combo = true
        this.decrease_action_point = true
        this.have_action = true
        this.exp_cost = template.exp_cost
        this.mastery_cost =template.mastery_cost
        this.mastery = template.mastery
    }

    addMastery(){
        this.player.sorcery_mastery_gained ++
    }

    getImagePath(){
        return config.img_url + this.img
    }
    canUse(enemy = undefined){
        return enemy && !enemy.isDead();
    }
    getCost(){
        let result = ''

        if(this.mana_cost){
            result += `mana cost - ${this.mana_cost} \n`
        }
        if(this.energy_cost){
            result += `energy cost - ${this.energy_cost} \n`
        }
        if(this.life_cost){
            result += `life cost - ${this.life_cost} \n`
        }

        if(this.exp_cost){
            result += `exp cost - ${this.exp_cost} \n`
        }

        if(this.mastery_cost){
            result += `${this.mastery} : ${this.mastery_cost}\n`
        }
        
        return result
    }
}
