import Skill from './Skill.js'
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import Freeze from "@/views/game/components/game_canvas/src/Status/Freeze/Freeze";

export default class GlacialNova extends Skill{
    constructor(template, player) {
        super(template, player)
        this.img = 'glacial_wave.gif'
        this.mana_cost = 3
        this.description = 'deals 2 cold damage per level and have 25% chance to freeze enemy'
        this.chance_to_freeze = 25;
    }

    use(){
        this.player.mana -= this.mana_cost
        this.player.setCast()
    }

    getMainDescription(){

        let result = `deals querter of your spell damage plus cold damage per level and have 25% chance to freeze enemy`

        if(this.player.combo_points >= 1){
            result += `\n(combo1) have 50% chance to freeze enemy`
        }
        if(this.player.combo_points === 2){
            result += `\n(combo2) deals half of your spell damage`
        }

        return result
    }

    action(){

        if(this.player.energy <= 15 && Math.random() < 0.5){
            Functions.createModal(this.player, 'cast failed...')
            return
        }
        Functions.createModal(this.player, this.name)

        let targets = this.player.figth_context.getFirstEnemiesInLines().filter(elem => !elem.isDead())
        
        let panish = this.player.combo_points === 2 ? 2 : 4
        let damage = {
            magic_damage: Math.floor(this.player.magic_damage / panish),
            fire_damage: Math.floor(this.player.fire_damage / panish),
            cold_damage: Math.floor(this.player.cold_damage / panish) + this.level,
            lightning_damage: Math.floor(this.player.lightning_damage_damage / panish)
        }

        let freeze_chance = this.player.combo_points >= 1 ? 50 : 25

        targets.forEach(elem =>{
            elem.takeSpellDamage(this.player, damage)
            if(Math.random() <= freeze_chance / 100){
                elem.newStatus(new Freeze(1), this.player)
            }
        })
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