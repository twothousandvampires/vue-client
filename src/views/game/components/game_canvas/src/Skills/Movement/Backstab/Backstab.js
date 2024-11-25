import Skill from "../../../Scr/Skills/Skill";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import Damage from "@/views/game/components/game_canvas/src/Scr/Damage";

export default class Backstab extends Skill{

    constructor(template, player, gem) {
        super(template, player, gem);
        this.img_name = 'backstab.png'
        this.description = 'there is no meanness against enemies...'
        this.additional_effect = 0
        this.init()
    }

    init(){
        this.effect_per_level = {
            1: 10,
            2: 20,
            3: 30,
            4: 40,
            5: 60,
            6: 80,
            7: 100,
            8: 120,
            9: 140,
            10: 200
        }
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
        this.skill_description = `you can hit any unit on the field with extra power(${this.getTotalEffect()})%`
    }

    cast(fight_context, target){
        let flat = Functions.random(this.player.max_attack_damage, this.player.min_attack_damage)

        let total = Functions.changeByPercent(flat, this.player.getTotalIncreasedAttackDamage() + this.getTotalEffect())
        let damage = new Damage(Damage.SOURCE_ATTACK, Damage.TYPE_HIT)
        damage.addPhysicalSource(total)

        target.takeAttackDamage(damage, this)
    }

    getTotalEffect(){
        let base = this.effect_per_level[this.level]
        let additional = this.additional_effect
        let total = base + additional
        if(this.gem.getIncreaseSkillEffect()){
            total = Math.floor(total * ((100 + this.gem.getIncreaseSkillEffect()) / 100))
        }
        return total
    }
}