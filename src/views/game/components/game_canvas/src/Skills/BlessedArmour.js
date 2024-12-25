import Skill from './Skill.js'
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import BlessedArmourBuff from "@/views/game/components/game_canvas/src/Status/BlessedArmourBuff";

export default class BlessedArmour extends Skill{
    constructor(template, player) {
        super(template, player)
        this.img = 'blessed_armour.gif'
        this.mana_cost = 1
        this.description = 'adds resist and armour per level for 3 turns'
        this.can_create_combo = false
    }

    use(enemy){
        this.player.mana -= this.getManaCost()
        this.player.setCast()
    }

    action(){
        if(this.player.energy <= 15 && Math.random() < 0.5){
            Functions.createModal(this.player, 'cast failed...')
            return
        }

        this.player.newStatus(new BlessedArmourBuff(this.level, this.player.combo_points >= 1 ? 5 : 3), this.player, true)
    }
    getManaCost(){
        this.player.combo_points === 2 ? 0 : this.mana_cost
    }
    getTotalArmout(){
        return this.level 
    }

    getTotalResist(){
        return this.level * 2
    }
    
    getMainDescription(){
        let result = `increases armour (${this.getTotalArmout()}) and resist (${this.getTotalResist()}) for 3 turns`

        if(this.player.combo_points >= 1){
            result += `\n(combo 1) for 5 turns`
        }
        if(this.player.combo_points === 2){
            result += `\n(combo 2) free cost`
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