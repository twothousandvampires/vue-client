import Item from "@/script/Items/Item";
import SkillCreator from "@/script/Skills/SkillCreator";

export default class Gem extends Item{

    constructor(template) {
        super(template)
        this.props = []
        template.properties.forEach(elem => {
            this.props.push(SkillCreator.createSkill(elem))
        })
    }

    getDescription(){
        let result = ``
        result += this.name + '\n'

        this.props.forEach(elem => {
            result += `${elem.name}(${elem.level})`
        })

        return result
    }
    equip(p){
        console.log('gem equiped')
    }
    unequip(p){

    }
}