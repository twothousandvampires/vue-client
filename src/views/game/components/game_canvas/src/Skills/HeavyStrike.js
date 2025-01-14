import Stun from '../Status/Stun.js'
import Skill from './Skill.js'
import GroundSlam from '../Effects/GroundSlam/GroundSlam.js'

export default class HeavyStrike extends Skill{
    constructor(template, player) {
        super(template, player)
        this.img = 'heavy_strike.png'
        this.energy_cost = 30
        this.description = 'deals damage by you attack plus 4 crushing damage per level'
        this.can_create_combo = false
    }

    use(enemy = false){
        this.player.reduceEnergy(this.energy_cost)
        this.player.setAttack()
        this.target = enemy
    }

    action(){
        let enemy = this.target
        let damage =  {
            physical_damage: this.player.physical_damage,
            piercing_damage: this.player.piercing_damage,
            cutting_damage: this.player.cutting_damage,
            crushing_damage: this.player.crushing_damage + (this.level * 4)
        }
        
        enemy.takeAttackDamage(this.player, damage)
        this.player.fight_context.addEffect(new GroundSlam(this.player.fight_context), enemy.num)

        if(this.player.combo_points >= 1 && Math.random() < 0.5){
            enemy.newStatus(new Stun(1), this.player)
        }

        if(this.player.combo_points === 2){
            let targets = this.player.fight_context.getEnemiesInSquare(enemy).filter(elem => !elem.isDead() && elem != enemy)
            let damage = {
                physical_damage: 0,
                piercing_damage: 0,
                cutting_damage: 0,
                crushing_damage: this.level * 4
            }
            targets.forEach(element => {
                element.takeAttackDamage(this.player, damage)
                this.player.fight_context.addEffect(new GroundSlam(this.player.fight_context), element.num)
            });
        }
    }

    getMainDescription(){

        let total_phys = this.player.getTotalPhysDamage() + (this.level * 4)

        let result = `deals attack damage plus 4 crushing damage per level (total is ${total_phys})`

        if(this.player.combo_points >= 1){
            result += `\n(combo1) has 50% chance to stun enemy for 1 turn`
        }
        if(this.player.combo_points === 2){
            result += `\n(combo2) near targets get crushing damage (${this.level * 4})`
        }

        return result
    }

    canUse(enemy = undefined){
        if(enemy === this.player) return false
        let fight_context = this.player.fight_context
        return enemy && !enemy.isDead() && fight_context.checkLine(enemy.num);
    }

    getDescription(){
        let result = ``
        result += `${this.name} (${this.level})\n`
        result += `${this.getMainDescription()} \n`
        result += `${this.getCost()}`
        return result
    }
}