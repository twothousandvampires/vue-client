import Skill from './Skill.js'
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import VampiricRiteBuff from "@/views/game/components/game_canvas/src/Status/VampiricRiteBuff";
import VampiricRiteEffect from "@/views/game/components/game_canvas/src/Effects/VampiricRIte/VampiricRiteEffect";

export default class VampiricRite extends Skill{
    constructor(template, player) {
        super(template, player)
        this.img = 'vampiric_rite.png'
        this.mana_cost = 2
        this.life_cost = 2
        this.description = 'enemy'

    }
    action(){
    
        if(this.player.energy <= 15 && Math.random() < 0.5){
            Functions.createModal(this.player, 'cast failed...')
            return
        }

        let targets = this.player.fight_context.turn_queue.filter(elem => !elem.isDead() && elem !== this.player)
        
        Functions.createModal(this.player, this.name)

        if(targets.length && this.player.combo_points === 2){
            let damage = {
                magic_damage: this.player.magic_damage,
                fire_damage: 0,
                cold_damage: 0,
                lightning_damage: 0
            }
            targets.forEach(elem =>{
                elem.takeSpellDamage(this.player, damage)
            })
        }
        if(targets.length){
            this.player.newStatus(new VampiricRiteBuff(targets.length, this.player.combo_points >= 1 ? 6 : 3), this.player, true)
        }
       
        this.player.fight_context.addEffect(new VampiricRiteEffect(this.player.fight_context), 18)
    }
    use(){
        this.player.mana -= this.mana_cost
        this.player.reduceLife(this.life_cost, false)
        this.player.setCast()
    }
    getMainDescription(){

        let result = `you get life leech equals number of enemy for 3 turns`

        if(this.player.combo_points >= 1){
            result += `\n(combo1) for 6 turns`
        }
        if(this.player.combo_points === 2){
            result += `\n(combo2) deals magic damage`
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

    canUse(enemy) {
        return true
    }
}