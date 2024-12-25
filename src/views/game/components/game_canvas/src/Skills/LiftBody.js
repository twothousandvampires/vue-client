import Skill from './Skill.js'
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import SummonedLivingFlesh from "@/views/game/components/game_canvas/src/Character/SummonedLivingFlesh";
export default class LiftBody extends Skill{

    constructor(template, player) {
        super(template, player)
        this.img = 'summon_living_flesh.png'
        this.mana_cost = 3
        this.description = 'summons a living flesh'
        this.can_create_combo = false
    }

    use(){
        this.player.mana -= this.mana_cost
        this.player.setCast()
    }
    action(){
        if(this.player.energy <= 15 && Math.random() < 0.5){
            Functions.createModal(this.player, 'cast failed...')
            return
        }
        Functions.createModal(this.player, this.name)


        let body = new SummonedLivingFlesh(this.player.figth_context, this.level, this.player.combo_points, this.player.minion_life, this.player.minion_damage)
        this.player.summon(body)
    }

    getMainDescription(){

        let result = `summon living flesh`

        if(this.player.combo_points >= 1){
            result += `\n(combo1) has double life`
        }
        if(this.player.combo_points === 2){
            result += `\n(combo2) tounts enemies`
        }

        return result
    }

    getDescription(){
        let result = ``
        result += `${this.name} (${this.level})\n`
        result += `${this.getMainDescription()} \n`
        result += `${this.getCost()}`
        return result
    }

    canUse(enemy = undefined) {
        return true
    }
}