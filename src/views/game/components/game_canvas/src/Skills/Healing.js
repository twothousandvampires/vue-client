import HealingRegenerationBuff from '../Status/HealingRegenerationBuff';
import Skill from './Skill.js'
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";

export default class Healing extends Skill{
    constructor(template, player) {
        super(template, player)
        this.img = 'healing.gif'
        this.mana_cost = 1
        this.description = 'restore 2 hp per level and quarter of your magic damage'
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

        this.player.addLife(this.getHealEffect())
        if(this.player.combo_points >= 1){
            this.player.newStatus(new HealingRegenerationBuff(this.level, 3), this.player, true)
        }
        if(this.player.combo_points === 2){
            this.player.removeNegativeStatus(1)
        }
    }

    getHealEffect(){
        return (this.level * 2) + Math.floor(this.player.magic_damage / 4)
    }

    getMainDescription(){
    
        let result = `restores 2 hp per level and quarter of your magic damage (total heal is ${this.getHealEffect()})`

        if(this.player.combo_points >= 1){
            result += `\n(combo1) gives life regeneration for 3 turns`
        }
        if(this.player.combo_points === 2){
            result += `\n(combo2) removes 1 negative status`
        }

    
        return result
    }

    getDescription(){
        let result = ``
        result += `${this.name} (${this.level})\n`
        result += `${this.getMainDescription()} \n`
        result += `mana cost - ${this.mana_cost} \n`
        return result
    }

    canUse(enemy = undefined) {
        return true
    }
}