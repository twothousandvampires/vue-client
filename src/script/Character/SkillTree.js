import Passive from "../Skills/passive/Passive";

export default class SkillTree{

    constructor(template, player) {

        this.combat_passives = [];
        this.sorcery_passives = [];
        this.travel_passives = [];
        this.active = [];

        console.log(template)

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
}