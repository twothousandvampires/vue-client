import SkillAddsCreator from "../../Scr/factories/SkillAmplificationFactory";
import config from '/config.js'
export default class Skill{
    constructor(template, player, gem = false) {
        this.gem = gem
        this.player = player
        this.level = template.level
        this.exp_needed = template.exp_needed
        this.amplifications = new Map
        this.available_amplifications = new Map
        this.crit_chance = 0
        this.id = template.id
        this.name = template.name
        this.is_active_skill = template.is_active_skill

        template.children.forEach(elem =>{
            if(+elem.level === 0){
                this.available_amplifications.set(elem.name, SkillAddsCreator.create(elem, this))
            }
            else {
                this.amplifications.set(elem.name, SkillAddsCreator.create(elem, this))
            }
        })
    }

    getOwner(){
        return this.player
    }

    getTotalManaCost(){
        return this.mana_cost
    }
    getDescription(){
        return this.description
    }

    setAvailableAmplifications(options){
        options.forEach(elem =>{
            this.available_amplifications.set(elem.name, SkillAddsCreator.create(elem))
        })
    }

    setAmplifications(option){
        this.amplifications.set(option.name, SkillAddsCreator.create(option, this))
        this.available_amplifications = new Map();
        this.init()
    }

    upgradeAmplification(data){
        this.amplifications.get(data.name).levelUp()
        this.init()
    }

    levelUp(){
        this.level++
        this.init()
    }
    getTotalCriticalChance(){
        return this.crit_chance + this.player.spell_crit_chance
    }
    getTotalCriticalMultiplier(){
        return this.player.spell_crit_multiplier + this.spell_crit_multiplier
    }

    getImgPath(){
        return config.img_url + this.img_name
    }

    getSkillDescription(){
        return this.skill_description
    }
}