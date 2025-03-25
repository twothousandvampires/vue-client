import Point from '../Scr/Point.js'
import Skill from './Skill.js'

export default class BackStab extends Skill{
    constructor(template, player) {
        super(template, player)
        this.img = 'back_stab.png'
        this.energy_cost = 30
        this.mana_cost = 1
    }

    addMastery(){
        this.player.movement_mastery_gained ++
    }

    use(enemy = false){
        this.target = enemy
        this.player.reduceEnergy(this.getEnergyCost())
        this.player.mana -= this.mana_cost

        this.player.fliped = true
        this.player.point = new Point(enemy.point.x + 10, enemy.point.y)
        this.player.need_restore_sprite = true
        this.player.setAttack()

        return true
    }

    action(){
        let enemy = this.target
        let d = this.player.getPhysicalDamage()
        d.piercing_damage += this.level * 3
        let options = {}

        if(this.player.combo_points === 1){
            options.additional_critical_chance = 25
        }
        else if(this.player.combo_points === 2){
            options.additional_critical_chance = 25
            options.additional_critical_damage = 50
        }

        enemy.takeAttackDamage(this.player, d, options)

    }
    canUse(enemy = undefined){
        if(enemy === this.player) return false
        return enemy && !enemy.isDead()
    }

    getMainDescription(){
    
        let result = `deals weapon damage plus 3 piercing damage per level to any target`

        if(this.player.combo_points >= 1){
            result += `\n(combo 1) additional 25% chance to critical strike`
        }
        if(this.player.combo_points === 2){
            result += `\n(combo 2) additional 50% critical damage`
        }
       
        return result
    }
    getEnergyCost(){
         return this.energy_cost
    }
    getDescription(){
        let result = ``
        result += `${this.name} (${this.level})\n`
        result += `${this.getMainDescription()} \n`
        result += `${this.getCost()}`
        return result
    }
}