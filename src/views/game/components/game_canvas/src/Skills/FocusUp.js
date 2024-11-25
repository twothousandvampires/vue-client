import Skill from './Skill.js'
import FocusUpBuff from "@/views/game/components/game_canvas/src/Status/FocusUpBuff";
export default class FocusUp extends Skill{
    constructor(template, player) {
        super(template, player)
        this.img = 'intuition_passive.png'
        this.mana_cost = 1
        this.energy_cost = 10
        this.description = 'increases your speed by 200 per level for 3 turns'
    }

    use(){
        this.player.mana -= this.mana_cost
        this.player.reduceEnergy(this.energy_cost)


        this.player.setCast()
        this.player.newStatus(new FocusUpBuff(this.level * 200, 3), this.player, true)
    }

    getDescription(){
        let result = ``
        result += `${this.name} (${this.level})\n`
        result += `${this.description} \n`
        result += `mana cost - ${this.mana_cost} \n`
        return result
    }

    canUse(enemy) {
        return true
    }
}