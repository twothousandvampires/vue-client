import Item from "@/script/Items/Item";
import SkillCreator from "@/script/Skills/SkillCreator";

export default class Gem extends Item{

    constructor(template) {
        super(template)
        this.props = []
        template.properties.forEach(elem => {
            this.props.push(SkillCreator.createSkill(elem))
        })
        this.props.sort(function (a,b){
            return a.order - b.order
        })
    }

    getDescription(){
        let result = ``
        result += this.name + '\n'

        this.props.forEach(elem => {
            result += `${elem.name}(${elem.level}) \n`
        })

        return result
    }
    equip(p){
        this.props.forEach(elem =>{
            elem.affect(p)
        })
        p.createStats()
    }
    unequip(p){
        this.props.forEach(elem =>{
            elem.stopAffect(p)
        })
        p.createStats()
    }
}