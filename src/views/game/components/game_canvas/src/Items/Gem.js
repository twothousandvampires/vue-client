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
        this.props = template.props
    }
    getUpgradeAmpExpCost(){
        return this.props.find(elem => elem.prop_name === 'upgrade_amp_exp_cost').value
    }
    getMaxAmp(){
        return this.props.find(elem => elem.prop_name === 'max_amp').value
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