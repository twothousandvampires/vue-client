import Skill from "@/views/game/components/game_canvas/src/Scr/Skills/Skill";
import ShieldUpStatus from "@/views/game/components/game_canvas/src/Status/ShieldUp/ShieldUp";
export default class ShieldUp  extends Skill{

    constructor(template, player, gem) {
        super(template, player, gem);
        this.img_name = 'shield_up.png'
        this.description = 'you cannot block death but you can block its hit'
        this.additional_effect = 0
        this.additional_durration = 0
        this.init()
    }

    init(){

        this.mana_cost_per_level = {
            1: 1,
            2: 1,
            3: 1,
            4: 2,
            5: 2,
            6: 2,
            7: 2,
            8: 3,
            9: 3,
            10: 4
        }
        this.effect_per_level = {
            1: 5,
            2: 10,
            3: 15,
            4: 20,
            5: 22,
            6: 24,
            7: 26,
            8: 28,
            9: 30,
            10: 35
        }

        this.duration_per_level = {
            1: 2,
            2: 2,
            3: 2,
            4: 3,
            5: 3,
            6: 3,
            7: 3,
            8: 3,
            9: 3,
            10: 4
        }
        this.skill_description = `increase your chance to block attack damage by ${this.getTotalEffect()} for ${this.getTotalDuration()} turns`
    }

    cast() {
        this.player.newStatus(new ShieldUpStatus(this.getTotalEffect(), this.getTotalDuration()))
    }
}