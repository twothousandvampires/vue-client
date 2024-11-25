import Skill from "../../../Scr/Skills/Skill";
export default class InnerEnergy extends Skill{
    constructor(template, player, gem) {
        super(template, player, gem);
        this.img_name = 'inner_energy.png'
        this.description = 'between things, a spark'
        this.additional_effect = 0
        this.init()
    }
    init(){
        this.effect_per_level = {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 10,
            10: 10
        }
        this.skill_description = `increase your mana by ${this.getTotalEffect()}`
    }
}