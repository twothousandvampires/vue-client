import Skill from './Skill.js'

export default class WeaponSwing extends Skill{
    constructor(template, player) {
        super(template, player)
        this.img = 'weapon_swing.png'
        this.energy_cost = 25
        this.description = 'deals damage by your cutting damage plus 2 cutting damage per level to target and targets upper and below'
    }

    use(enemy = false){
        this.player.reduceEnergy(this.getEnergyCost())
        this.player.setAttack()
        this.target = enemy
    }

    action(){
        let enemy = this.target
        let targets = this.player.fight_context.getTargetsUpperAndBottom(enemy).filter(elem => !elem.isDead())
        let up_and_below = targets.filter(elem => elem !== enemy)

        let d = this.player.getPhysicalDamage()
        d.cutting_damage += this.level * 2

        let panish = this.player.combo_points === 2 ? 1 : 0.5
        let d2 = {
            physical_damage: Math.floor(this.player.physical_damage / panish),
            piercing_damage: Math.floor(this.player.piercing_damage / panish),
            cutting_damage: Math.floor(this.player.cutting_damage / panish) + this.level * 2,
            crushing_damage: Math.floor(this.player.crushing_damage / panish),
        }

        up_and_below.forEach(element => {
            element.takeAttackDamage(this.player, d2)
        });

        enemy.takeAttackDamage(this.player, d)
    }

    canUse(enemy = undefined){
        if(enemy === this.player) return false
        let fight_context = this.player.fight_context
        return enemy && !enemy.isDead() && fight_context.checkLine(enemy.num);
    }

    getMainDescription(){

        let result = `target gets attack damage plus 2 cutting damage per level target's below and upper get half damage`

        if(this.player.combo_points >= 1){
            result += `\n(combo1) energy cost is reduced by 10`
        }
        if(this.player.combo_points === 2){
            result += `\n(combo2) target's below and upper get full damage`
        }

        return result
    }
    
    getEnergyCost(){
        if(!this.player.combo_points){
            return this.energy_cost
        }
        else {
            return this.energy_cost - 10
        }
    }
    getDescription(){
        let result = ``
        result += `${this.name} (${this.level})\n`
        result += `${this.getMainDescription()} \n`
        result += `${this.getCost()}`
        return result
    }
}