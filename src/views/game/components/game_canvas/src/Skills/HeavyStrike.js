import Skill from './Skill.js'

export default class HeavyStrike extends Skill{
    constructor(template, player) {
        super(template, player)
        this.img = 'heavy_strike.png'
        this.energy_cost = 30
        this.description = 'deals damage by you attack plus 4 crushing damage per level'
    }

    use(enemy = false){
        this.player.reduceEnergy(this.energy_cost)
        this.player.setAttack()

        let damage =  {
            physical_damage: this.player.physical_damage,
            piercing_damage: this.player.piercing_damage,
            cutting_damage: this.player.cutting_damage,
            crushing_damage: this.player.crushing_damage + (this.level * 4)
        }

        enemy.takeAttackDamage(this.player, damage)

        return true
    }

    canUse(enemy = undefined){
        let figth_context = this.player.figth_context
        return enemy && !enemy.isDead() && figth_context.checkLine(enemy.num);
    }

    getDescription(){
        let result = ``
        result += `${this.name} (${this.level})\n`
        result += `${this.description} \n`
        result += `energy_cost - ${this.energy_cost} \n`
        return result
    }
}