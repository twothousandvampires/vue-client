import Skill from './Skill.js'
import Silence from '../Status/Silince.js';
import MagicExplosion from '../Effects/MagicExplosion/MagicExplosion.js';
import Blind from '../Status/Blind.js';

export default class BlindingPowder extends Skill{
    constructor(template, player) {
        super(template, player)
        this.img = 'blinding_powder.png'
        this.mana_cost = 1
        this.energy_cost = 8
    }
    getBlindEffect(){
        return 20 + (this.level * 5)
    }
    getFireDamage(){
        return this.level * 2
    }
    use(enemy = false){
        this.player.mana -= this.mana_cost
        this.player.reduceEnergy(this.energy_cost)

        this.player.setCast()
        this.targer = enemy
        
        return true
    }

    action(){
        let enemy = this.targer
        let targets = this.player.fight_context.getEnemiesInSquare(enemy).filter(elem => !elem.isDead())
        this.player.fight_context.addEffect(new MagicExplosion(this.player.fight_context, 200, 200), enemy.num)

        targets.forEach(elem => {
            elem.newStatus(new Blind(this.getBlindEffect(), 2), this.player)
        })
      
        if(this.player.combo_points >= 1){
            let d = {
                fire_damage: this.getFireDamage()
            }
            targets.forEach(elem => {
                elem.takeSpellDamage(this.player, d)
            })
        }

        if(this.player.combo_points === 2){
            targets.forEach(elem => {
                elem.newStatus(new Silence(1, 1), this.player)
            })
        }
    }

    getMainDescription(){
    
        let result = `blind enemies with ${this.getBlindEffect()} effect for 2 turns`
       
        if(this.player.combo_points >= 1){
            result += `\n(combo 1) and deals ${this.getFireDamage()} fire damage`
        }
        if(this.player.combo_points === 2){
            result += `\n(combo 2) also apply silence for 1 turn`
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