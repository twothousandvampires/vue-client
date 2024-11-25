import Skill from "../../../Scr/Skills/Skill";
export default class Instincts extends Skill{

    constructor(template, player, gem) {
        super(template, player, gem);
        this.img_name = 'instincts.png'
        this.description = 'you know this, but where?'
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
        this.skill_description = `increase your evade chance by ${this.getTotalEffect()}%`
    }
}