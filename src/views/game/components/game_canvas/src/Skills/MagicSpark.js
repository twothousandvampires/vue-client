import Skill from './Skill.js'
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import SparkEffect from '../Effects/Spark/SparkEffect.js';

export default class MagicSpark extends Skill{

    constructor(template, player) {
        super(template, player)
        this.img = 'luminous_arc.gif'
        this.mana_cost = 2
        this.description = 'deals magic damage up to 4 random targets plus one per level'
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

        let damage = this.player.getMagicDamage()

        damage.magic_damage += this.level

        let total_sparks = this.getTotalSparks()

        for(let i = 0; i < total_sparks; i++) {
            let targets = this.player.figth_context.enemy_pull.filter(elem => !elem.isDead())
            let t = targets[Math.floor(Math.random() * targets.length)]
            if(t){
                this.player.figth_context.addEffect(new SparkEffect(this.player.figth_context), t.num)
                t.takeSpellDamage(this.player, damage)
            }
        }
    }

    getTotalSparks(){
        if(!this.player.combo_points){
            return 4
        }
        else if(this.player.combo_points === 1){
            return 5
        }
        else if(this.player.combo_points === 2){
            return 6
        }
    }
    getTotal(){
        let result = this.player.getTotalMagicDamage()
        result += this.level
        return result
    }
    
    getMainDescription(){
    
        let result = `deals spell damage plus one magic per level (total is ${this.getTotal()}) up to ${this.getTotalSparks()} random targets`

        if(this.player.combo_points >= 1){
            result += `\n(combo1) up to ${this.getTotalSparks()}t`
        }
        if(this.player.combo_points === 2){
            result += `\n(combo2) up to ${this.getTotalSparks()}`
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

