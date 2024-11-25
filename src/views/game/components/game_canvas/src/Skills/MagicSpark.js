import Skill from './Skill.js'
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
export default class MagicSpark extends Skill{

    constructor(template, player) {
        super(template, player)
        this.img = 'luminous_arc.gif'
        this.mana_cost = 1
        this.description = 'deals magic damage up to 4 random targets plus one per level'
    }

    use(){
        this.player.mana -= this.mana_cost

        if(this.player.energy <= 15 && Math.random() < 0.5){
            Functions.createModal(this.player, 'cast failed...')
            return
        }

        this.player.setCast()

        Functions.createModal(this.player, this.name)

        let damage = this.player.getMagicDamage()

        damage.magic_damage += this.level

        for(let i = 0; i < 3; i++) {
            let targets = this.player.figth_context.enemy_pull.filter(elem => !elem.isDead())
            let t = targets[Math.floor(Math.random() * targets.length)]
            if(t){
                t.takeSpellDamage(this.player, damage)
            }
        }
    }

    getDescription(){
        let result = ``
        result += `${this.name} (${this.level})\n`
        result += `${this.description} \n`
        result += `mana cost - ${this.mana_cost} \n`
        return result
    }

    canUse(enemy = undefined) {
        return true
    }
}

