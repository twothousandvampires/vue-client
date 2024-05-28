import Item from "./Item";
import GemSkillFactory from "../Scr/factories/GemSkillFactory";

export default class Gem extends Item{

    static quality_strings = {
        1: 'low',
        2: 'normal',
        3: 'good',
        4: 'masterpiece'
    }

    static class_strings = {
        1: 'combat',
        2: 'sorcery',
        3: 'movement',
        4: 'all'
    }

    static type_strings = {
        1: 'active',
        2: 'passive',
        3: 'all',
    }

    constructor(template, player) {
        super(template)
        this.details = template.details
        this.skill = GemSkillFactory.create(template.skill, this, player)
    }
    getUpgradeAmpExpCost(){
        return this.details.amplification_upgrade_cost
    }
    getMaxAmp(){
        return this.details.maximum_number_of_amplifications
    }
    getReduceManaCost(){
        return this.details.reduce_mana_cost
    }
    getIncreaseSkillEffect(){
        return this.details.increase_skill_effect
    }
     equip(player){
        player.addSkill(this.skill)
     }

     unequip(player){
         player.removeSkill(this.skill)
     }

     getQualityString(){
        return Gem.quality_strings[this.details.gem_quality]
     }
    getClassString(){
        return Gem.class_strings[this.details.gem_class]
    }
    getTypeString(){
        return Gem.type_strings[this.details.gem_type]
    }

}