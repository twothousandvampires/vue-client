import Skill from './Skill.js'
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import BlessedArmourBuff from "@/views/game/components/game_canvas/src/Status/BlessedArmourBuff";

export default class BlessedArmour extends Skill{
    constructor(template, player) {
        super(template, player)
        this.img = 'blessed_armour.gif'
        this.mana_cost = 2
        this.description = 'adds resist and armour per level for 3 turns'
    }

    use(enemy){
        this.player.mana -= this.mana_cost

        if(this.player.energy <= 15 && Math.random() < 0.5){
            Functions.createModal(this.player, 'cast failed...')
            return
        }

        this.player.newStatus(new BlessedArmourBuff(this.level, 3), this.player, true)
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