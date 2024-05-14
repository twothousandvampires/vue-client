import Functions from "../../../GameFunctions";
import Damage from "../../../Scr/Damage";
import {default as FallingRocksProj } from "../../../Projectiles/FallingRocks/FallingRocks";
import Skill from "../../../Scr/Skills/Skill";

export default class FallingRocks extends Skill{

    constructor(template, player, gem) {
        super(template, player, gem)
        this.img_path = 'src/assets/img/icons/skill/falling_rocks.png'
        this.init()
    }

    set(){
        this.min_damage = this.level * 10
        this.max_damage = this.level * 22
    }
    getDamage(){
        return new Damage(this, this.getDamageValue(), Damage.DAMAGE_TYPE_SPELL, Damage.HIT, Damage.HIT_TYPE_AREA, this.owner)
    }

    getDamageValue(){
        return Math.round(Math.random() * (this.max_damage - this.min_damage) + this.min_damage)
    }

    getDescription(){
        return this.description + '('  + this.min_damage + '-' + this.max_damage  + ')'
    }

    init(){
        this.description = '?'
    }

   async cast(fight_context, cords) {

        let player = fight_context.player


        let min_x = cords.x - 150
        let max_x = cords.x + 150

        let min_y = cords.y - 50
        let max_y = cords.y + 50



        for (let i = 0; i < 40;i++){
            let x = Math.floor(Math.random() * (max_x - min_x) + min_x)
            let y = Math.floor(Math.random() * (max_y - min_y) + min_y)

            let z = Math.floor(Math.random() * (400 - 300) + 300)
            fight_context.projectiles.push(new FallingRocksProj(player, fight_context,x,y,z))
            await Functions.sleep(200)
        }


    }
}