import Skill from "@/views/game/components/game_canvas/src/Scr/Skills/Skill";
export default class StoneSkin extends Skill{
    static effect_per_level = {
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
    constructor(template, player, gem) {
        super(template, player, gem);
        this.img_name = 'stone_skin.png'
        this.description = 'not armored, but protected'
        this.additional_effect = 0
        this.init()
    }

    init(){
        this.skill_description = `increase your physical redaction by ${this.getTotalEffect()}`
    }

    getTotalEffect(){
        let base = StoneSkin.effect_per_level[this.level]
        let additional = this.additional_effect
        let total = base + additional
        if(this.gem.getIncreaseSkillEffect()){
            total = Math.floor(total * ((100 + this.gem.getIncreaseSkillEffect()) / 100))
        }
        return total
    }
}