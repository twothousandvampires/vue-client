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

    use(enemy = false){
        this.player.reduceEnergy(this.energy_cost)
        this.player.setAttack()

        let damage =  {
            physical_damage: this.player.physical_damage,
            piercing_damage: this.player.piercing_damage,
            cutting_damage: this.player.cutting_damage + this.level,
            crushing_damage: this.player.crushing_damage
        }

        enemy.takeAttackDamage(this.player, damage)

        if(Functions.chance(this.ignite_chance)){
            enemy.newStatus(new Ignite(this.level, 3), this.player)
        }

        return true
    }

    canUse(enemy = undefined){
        return enemy && !enemy.isDead()
    }

    getDescription(){
        let result = ``
        result += `${this.name} (${this.level})\n`
        result += `${this.description} \n`
        result += `energy_cost - ${this.energy_cost} \n`
        return result
    }
}