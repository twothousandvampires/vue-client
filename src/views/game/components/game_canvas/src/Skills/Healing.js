import Skill from './Skill.js'
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";

export default class Healing extends Skill{
    constructor(template, player) {
        super(template, player)
        this.img = 'healing.gif'
        this.mana_cost = 1
        this.description = 'restore 2 hp per level and quarter of your magic damage'
    }

    use(){
        this.player.mana -= this.mana_cost

        if(this.player.energy <= 15 && Math.random() < 0.5){
            Functions.createModal(this.player, 'cast failed...')
            return
        }


        this.player.setCast()
        let effect = (this.level * 2) + Math.floor(this.player.magic_damage)
        this.player.addLife(effect)
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