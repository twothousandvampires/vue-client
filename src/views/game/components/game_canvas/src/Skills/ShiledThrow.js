import ShiledEffect from '../Effects/ShieldEffect/ShieldEffect.js'
import Functions from '../GameFunctions.js'
import Point from '../Scr/Point.js'
import Skill from './Skill.js'

export default class ShieldThrow extends Skill{
    constructor(template, player) {
        super(template, player)
        this.img = 'shield_throw.png'
        this.energy_cost = 40
        this.can_create_combo = false
        this.chain_count = 0
        this.hitted = []
    }

    use(enemy){
        this.target = enemy
        this.player.reduceEnergy(this.getEnergyCost())
        this.player.setAttack()
        if(this.player.combo_points >= 1){
            this.chain_count = 2
        }
    }
    hit(){
        let d = this.player.getPhysicalDamage()
        this.target.takeAttackDamage(this.player, d)
        this.hitted.push(this.target)
        if(this.chain_count <= 0){
            this.skillEnd()
        }
        else{
            this.chain_count --
            let new_possible_targets = this.player.fight_context.getAliveEnemies();
            new_possible_targets = new_possible_targets.filter(elem => !this.hitted.includes(elem))
            let new_target = new_possible_targets[Math.floor(Math.random() * new_possible_targets.length)]
            if(new_target){
                this.effect.move_angle = Functions.angle(this.effect, new_target)
                this.effect.target = new_target
                this.target = new_target
            }
            else{
                this.skillEnd()
            }
        }
       
    }
    skillEnd(){
        this.player.fight_context.removeEffect(this.effect)
        this.chain_count = 0
        this.hitted = []
    }
    action(){
        this.effect = new ShiledEffect(this.player.fight_context, this, this.target, Functions.angle(this.player, this.target))
        this.effect.point = new Point(this.player.point.x, this.player.point.y)
        this.player.fight_context.addEffect(this.effect)
    }

    getEnergyCost(){
        return this.player.combo_points === 2 ? this.energy_cost - 20 : this.energy_cost
    }
    getMainDescription(){

        let result = `thorw a shield to any target dealing attack damage`

        if(this.player.combo_points >= 1){
            result += `\n(combo1) chain up to 2 target`
        }
        if(this.player.combo_points === 2){
            result += `\n(combo2) energy cost is reduced by 20`
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

    canUse(enemy = undefined) {
        if(enemy === this.player) return false

        return enemy && !enemy.isDead();
    }
}