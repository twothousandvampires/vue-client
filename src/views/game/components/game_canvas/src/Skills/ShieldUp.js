import Skill from './Skill.js'
import ShieldUpBuff from "@/views/game/components/game_canvas/src/Status/ShieldUpBuff";

export default class ShieldUp extends Skill{
    constructor(template, player) {
        super(template, player)
        this.img = 'shield_up_skill.png'
        this.energy_cost = 35
        this.description = 'increases your speed by 200 per level for 3 turns'
        this.can_create_combo = false
    }

    use(){
        this.player.reduceEnergy(this.getEnergyCost())
        this.player.setCast()
    }

    action(){
        this.player.newStatus(new ShieldUpBuff(this.level * 5), this.player.combo_points === 2 ? 6 : 3, this.player, true)
    }

    getEnergyCost(){
        if(!this.player.combo_points){
            return this.energy_cost
        }
        else {
            return this.energy_cost - 20
        }
    }
    getMainDescription(){

        let result = `gives your additional chance to block (${this.level * 5}%) for 3 turns`

        if(this.player.combo_points >= 1){
            result += `\n(combo1) energy cost is reduced by 20`
        }
        if(this.player.combo_points === 2){
            result += `\n(combo2) for 6 turns`
        }

        return result
    }

    getDescription(){
        let result = ``
        result += `${this.name} (${this.level})\n`
        result += `${this.getMainDescription()} \n`
        result += `energy cost - ${this.getEnergyCost()} \n`
        return result
    }

    canUse(enemy) {
        return true
    }
}