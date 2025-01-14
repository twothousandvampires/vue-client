import Skill from './Skill.js'
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import FireExplosion from "@/views/game/components/game_canvas/src/Effects/FireExplosion/FireExplosion";
import Ignite from "@/views/game/components/game_canvas/src/Status/Ignite/Ignite";

export default class FireBall extends Skill{
    constructor(template, player) {
        super(template, player)
        this.img = 'fire_ball.gif'
        this.mana_cost = 2
        this.description = 'adds 2 magic and 3 fire damage per level'
    }

    use(enemy = false){
        this.target = enemy
        this.player.mana -= this.mana_cost
        this.player.setCast()
        return true
    }

    action(){
        let enemy = this.target
        if(this.player.energy <= 15 && Math.random() < 0.5){
            Functions.createModal(this.player, 'cast failed...')
            return
        }

        let damage = this.player.getMagicDamage()

        damage.fire_damage += this.level * 3

        if(!this.player.combo_points){
            enemy.takeSpellDamage(this.player, damage)
            this.player.fight_context.addEffect(new FireExplosion(this.player.fight_context, 80, 80), enemy.num)
        }
        if(this.player.combo_points === 1){
            enemy.takeSpellDamage(this.player, damage)
            this.player.fight_context.addEffect(new FireExplosion(this.player.fight_context, 80, 80), enemy.num)
            if(Math.random() < 0.5){
                enemy.newStatus(new Ignite(this.level * 3, 3), this.player)
            }
        }
        if(this.player.combo_points === 2){
            let targets = this.player.fight_context.getEnemiesInSquare(enemy).filter(elem => !elem.isDead())
            targets.forEach(elem =>{
                elem.takeSpellDamage(this.player, damage)
            })
            this.player.fight_context.addEffect(new FireExplosion(this.player.fight_context, 200, 200), enemy.num)
        } 
    }

    getTotal(){
        let result = this.player.getTotalMagicDamage()
        result += this.level * 3
        return result
    }

    getMainDescription(){
    
        let result = `deals spell damage plus 3 fire damage per level`

        if(this.player.combo_points >= 1){
            result += `\n(combo1) have 50% to ignite target`
        }
        if(this.player.combo_points === 2){
            result += `\n(combo2) hit enemy's close targets`
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