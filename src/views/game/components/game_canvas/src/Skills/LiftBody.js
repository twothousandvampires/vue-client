import Skill from './Skill.js'
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import SummonedLivingFlesh from "@/views/game/components/game_canvas/src/Character/SummonedLivingFlesh";
export default class LiftBody extends Skill{

    constructor(template, player) {
        super(template, player)
        this.img = 'summon_living_flesh.png'
        this.mana_cost = 6
        this.description = 'summons a living flesh'
    }

    use(){
        this.player.mana -= this.mana_cost

        if(this.player.energy <= 15 && Math.random() < 0.5){
            Functions.createModal(this.player, 'cast failed...')
            return
        }

        this.player.setCast()

        Functions.createModal(this.player, this.name)

        let body = new SummonedLivingFlesh(this.player.figth_context, this.level)

        this.player.summon(body)
    }

    getDescription(){
        let result = ``
        result += `${this.name} (${this.level})\n`
        result += `${this.description} \n`
        result += `mana cost - ${this.mana_cost} \n`
        return result
    }

    canUse(enemy = undefined) {
        return true
    }
}