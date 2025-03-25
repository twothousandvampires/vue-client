import Skill from './Skill.js'
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import Ignite from "@/views/game/components/game_canvas/src/Status/Ignite/Ignite";

export default class FireArrow extends Skill{
    constructor(template, player) {
        super(template, player)
        this.img = 'fire_arrow.png'
        this.energy_cost = 25
        this.description = 'deals damage to any target and have chance to ignite'
        this.ignite_chance = 50
    }

    addMastery(){
        this.player.combat_mastery_gained ++
    }

    use(enemy = false){
        this.player.reduceEnergy(this.energy_cost)
        this.player.setAttack()
        this.target = enemy
        
        return true
    }

    action(){
        let enemy = this.target
        let damage =  {
            physical_damage: this.player.physical_damage,
            piercing_damage: this.player.piercing_damage + this.level,
            cutting_damage: this.player.cutting_damage,
            crushing_damage: this.player.crushing_damage
        }

        enemy.takeAttackDamage(this.player, damage)

        if(Functions.chance(this.player.combo_points >= 1 ? 100 : this.ignite_chance)){
            enemy.newStatus(new Ignite(this.player.combo_points >= 2 ? this.level * 3 : this.level, 3), this.player)
        }
    }

    getMainDescription(){
    
        let result = `deals attack damage plus 1 piercing damage per level to any target and have chance to ignite (${this.ignite_chance}%)`

        if(this.player.combo_points >= 1){
            result += `\n(combo1) chance to ignite is (100%)`
        }
        if(this.player.combo_points === 2){
            result += `\n(combo2) ignite deals triple damage`
        }
      
        return result
    }
    canUse(enemy = undefined){
        if(enemy === this.player) return false
        return enemy && !enemy.isDead()
    }

    getDescription(){
        let result = ``
        result += `${this.name} (${this.level})\n`
        result += `${this.getMainDescription()} \n`
        result += `${this.getCost()}\n`
        return result
    }
}