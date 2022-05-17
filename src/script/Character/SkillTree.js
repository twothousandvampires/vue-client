import Passive from "../Skills/passive/Passive";

export default class SkillTree{

    constructor(template, player) {

        this.combat_passives = [];
        this.sorcery_passives = [];
        this.travel_passives = [];
        this.active = [];

        for(let skill in template){
            switch (template.type){
                case 'passive':
                    switch (template.class){
                        case 'combat':
                            this.combat_passives.push(new Passive(template))
                            break;
                        case 'sorcery':
                            this.sorcery_passives.push(new Passive(template))
                            break;
                        case 'travel':
                            this.travel_passives.push(new Passive(template))
                            break;
                    }
                    break;
                case 'active':
                    break;
            }
        }
    }
}