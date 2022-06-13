import Passive from "../Skills/passive/Passive";
import SkillCreator from "./SkillCreator";

export default class SkillTree{

    constructor(template, player) {

        this.combat_passives = [];
        this.sorcery_passives = [];
        this.travel_passives = [];
        this.active = [];
        this.player = player

        for(let one in template){
            let skill = template[one]
            switch (skill.type){
                case 'passive':
                    switch (skill.class){
                        case 'combat':
                            this.combat_passives.push(new Passive(skill, player))
                            break;
                        case 'sorcery':
                            this.sorcery_passives.push(new Passive(skill, player))
                            break;
                        case 'travel':
                            this.travel_passives.push(new Passive(skill, player))
                            break;
                    }
                    break;
                case 'active':
                    let new_skill = SkillCreator.create(skill,player)
                    this.player.skill_panel.skills.push(new_skill)
                    this.active.push(new_skill)
                    break;
            }
        }
    }

    getPassives(page){
        switch (page){
            case 'combat':
                return this.combat_passives
            case 'sorcery':
                return this.sorcery_passives
            case 'travel':
                return this.travel_passives
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