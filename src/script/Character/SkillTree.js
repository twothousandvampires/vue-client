import Passive from "../Skills/passive/Passive";
import SkillCreator from "./SkillCreator";

export default class SkillTree{

    constructor(template) {

        this.player = template
        this.passive = [];
        this.active = [];

        template.skills.forEach(elem => {
            let skill = SkillCreator.create(elem)
            switch (elem.type){
                case 'active':
                    this.active.push(skill)
                    break;
                case 'passive':
                    this.active.push(skill)
                    break;
            }
        })

    }

    getPassives(page){
        switch (page){
            case 'passive':
                return this.passive
            case 'active':
                return this.active
        }
    }

    learn(skill){
        let item = this.active.filter(elem => {
            return elem.name === skill.name
        })
        if(item[0]){
            item[0].levelUp()
        }
        else {
            this.active.push(SkillCreator.create(skill))
        }
    }

}