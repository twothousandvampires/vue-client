import Skill from './Skill.js'

export default class WeaponSwing extends Skill{
    constructor(template, player) {
        super(template, player)
        this.img = 'weapon_swing.png'
        this.energy_cost = 25
        this.description = 'deals damage by your cutting damage plus 2 cutting damage per level to target and targets upper and below'
    }

    use(enemy = false){
        this.player.reduceEnergy(this.energy_cost)
        this.player.setAttack()

        let up_and_below_damage =  {
            physical_damage: 0,
            piercing_damage: 0,
            cutting_damage: this.player.cutting_damage + (this.level * 2),
            crushing_damage: 0
        }
        let d = this.player.getPhysicalDamage()
        d.cutting_damage += this.level * 2

        let targets = this.player.figth_context.getTargetsUpperAndBottom(enemy).filter(elem => !elem.isDead())
        let up_and_below = targets.filter(elem => elem !== enemy)

        up_and_below.forEach(elem =>{
            elem.takeAttackDamage(this.player, up_and_below_damage)
        })

        enemy.takeAttackDamage(this.player, d)

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