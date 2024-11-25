import Skill from './Skill.js'
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import VampiricRiteBuff from "@/views/game/components/game_canvas/src/Status/VampiricRiteBuff";
import VampiricRiteEffect from "@/views/game/components/game_canvas/src/Effects/VampiricRIte/VampiricRiteEffect";

export default class VampiricRite extends Skill{
    constructor(template, player) {
        super(template, player)
        this.img = 'vampiric_rite.png'
        this.mana_cost = 3
        this.description = 'deals damage to enemies equal half of your magic damage plus 1 per level and gives you buff that have power equal of count hit enemy'
    }

    use(){
        this.player.mana -= this.mana_cost

        if(this.player.energy <= 15 && Math.random() < 0.5){
            Functions.createModal(this.player, 'cast failed...')
            return
        }

        let targets = this.player.figth_context.turn_queue.filter(elem => !elem.isDead() && elem !== this.player)
        this.player.setCast()

        Functions.createModal(this.player, this.name)
        let damage = {
            magic_damage: this.player.magic_damage / 2 + this.level,
            fire_damage: 0,
            cold_damage: 0,
            lightning_damage: 0
        }

        if(targets.length){
            targets.forEach(elem =>{
                elem.takeSpellDamage(this.player, damage)
            })
            this.player.newStatus(new VampiricRiteBuff(targets.length, 3), this.player, true)
        }
        this.player.figth_context.addEffect(new VampiricRiteEffect(this.player.figth_context), 18)
    }

    getDescription(){
        let result = ``
        result += `${this.name} (${this.level})\n`
        result += `${this.description} \n`
        result += `mana cost - ${this.mana_cost} \n`
        return result
    }

    canUse(enemy) {
        return true
    }
}