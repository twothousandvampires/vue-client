import Skill from './Skill.js'
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import Freeze from "@/views/game/components/game_canvas/src/Status/Freeze/Freeze";

export default class GlacialNova extends Skill{
    constructor(template, player) {
        super(template, player)
        this.img = 'glacial_wave.gif'
        this.mana_cost = 2
        this.description = 'deals 2 cold damage per level and have 25% chance to freeze enemy'
        this.chance_to_freeze = 25;
    }

    use(){
        this.player.mana -= this.mana_cost

        if(this.player.energy <= 15 && Math.random() < 0.5){
            Functions.createModal(this.player, 'cast failed...')
            return
        }

        let targets = this.player.figth_context.getFirstEnemiesInLines().filter(elem => !elem.isDead())
        this.player.setCast()
        Functions.createModal(this.player, this.name)
        let damage = {
            magic_damage: this.player.magic_damage,
            fire_damage: this.player.fire_damage,
            cold_damage: this.player.cold_damage + (this.level * 2),
            lightning_damage: this.player.lightning_damage
        }

        targets.forEach(elem =>{
            elem.takeSpellDamage(this.player, damage)
            if(Math.random() <= this.chance_to_freeze / 100){
                elem.newStatus(new Freeze(1), this.player)
            }
        })
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