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
    
    getEffect(){
        return this.level * 200
    }

    getComboEffect(){
        if(this.player.combo_points < 1){
            return 0
        }
        return this.level * 2
    }

    getEvadeEffect(){
        if(this.player.combo_points < 2){
            return 0
        }
        return this.level * 3
    }

    getMainDescription(){

        let result = `increases your speed by ${this.getEffect()} per level for 3 turns`

        if(this.player.combo_points >= 1){
            result += `\n(combo1) adds chance to get combo point by ${this.getComboEffect()}`
        }
        if(this.player.combo_points === 2){
            result += `\n(combo2) adds evade ${this.getEvadeEffect()}`
        }
       
        return result
    }

    use(){
        this.player.mana -= this.mana_cost
        this.player.reduceEnergy(this.energy_cost)

        this.player.setCast()
    }

    action(){
        this.player.newStatus(new FocusUpBuff(this.getEffect(), 3, this.getComboEffect(), this.getEvadeEffect()), this.player, true)
    }

    getDescription(){
        let result = ``
        result += `${this.name} (${this.level}) \n`
        result += `${this.getMainDescription()} \n`
        result += `${this.getCost()}`
        return result
    }

    canUse(enemy) {
        return true
    }
}