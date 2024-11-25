import Skill from './Skill.js'
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import FireExplosion from "@/views/game/components/game_canvas/src/Effects/FireExplosion/FireExplosion";

export default class FireBall extends Skill{
    constructor(template, player) {
        super(template, player)
        this.img = 'fire_ball.gif'
        this.mana_cost = 2
        this.description = 'adds 2 magic and 3 fire damage per level'
    }

    use(enemy = false){
        this.player.mana -= this.mana_cost

        if(this.player.energy <= 15 && Math.random() < 0.5){
            Functions.createModal(this.player, 'cast failed...')
            return
        }

        this.player.setCast()
        let damage = {
            magic_damage: this.player.magic_damage + (this.level  * 2),
            fire_damage: this.player.fire_damage + (this.level  * 3),
            cold_damage: this.player.cold_damage,
            lightning_damage: this.player.lightning_damage
        }
        enemy.takeSpellDamage(this.player, damage)
        this.player.figth_context.addEffect(new FireExplosion(this.player.figth_context, 80, 80), enemy.num)
        return true
    }

    getDescription(){
        let result = ``
        result += `${this.name} (${this.level})\n`
        result += `${this.description} \n`
        result += `mana cost - ${this.mana_cost} \n`
        return result
    }
}