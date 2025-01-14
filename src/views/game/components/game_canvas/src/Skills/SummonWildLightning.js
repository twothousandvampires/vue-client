import SummonedWildLightning from '../Character/SummonedWildLightning.js';
import Skill from './Skill.js'
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";

export default class SummonWildLightning extends Skill{

    constructor(template, player) {
        super(template, player)
        this.img = 'summon_wild_lightning.png'
        this.mana_cost = 4
        this.description = 'summon wild lightning'
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
        let wild = new SummonedWildLightning(this.player.fight_context, this.level, this.player.combo_points, this.player.minino_life, this.player.minion_damage)

        this.player.summon(wild)
    }

    getMainDescription(){

        let result = `summon wild lightning which uses lightning strike`

        if(this.player.combo_points >= 1){
            result += `\n(combo1) uses lightning strike and spark nova`
        }
        if(this.player.combo_points === 2){
            result += `\n(combo2) has a chance to create self clone after cast`
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