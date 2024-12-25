import LivingBombStatus from '../Status/LivingBombStatus.js'
import Skill from './Skill.js'

export default class LivingBomb extends Skill{
    constructor(template, player) {
        super(template, player)
        console.log(template)
        this.img = 'living_bomb.png'
        this.mana_cost = 1
        this.energy_cost = 10
    }

    use(enemy = false){
        this.target = enemy
        this.player.mana -= this.mana_cost
        this.player.setCast()
        this.player.reduceEnergy(this.energy_cost)
        return true
    }

    action(){
        let enemy = this.target
        enemy.newStatus(new LivingBombStatus(this.player.combo_points >= 1 ? 100 : 50, this.player.combo_points === 2), this.player)
    }


    getMainDescription(){
    
        let result = `when enemy die he will explode deals 50% of life as fire damage`

        if(this.player.combo_points >= 1){
            result += `\n(combo1) deals 100% of life as fire damage`
        }
        if(this.player.combo_points === 2){
            result += `\n(combo2) attach to new target after explode`
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
}