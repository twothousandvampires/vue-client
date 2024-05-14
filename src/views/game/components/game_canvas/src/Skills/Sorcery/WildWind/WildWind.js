import Functions from "../../../GameFunctions";
import  {default as WildWindProj }  from "../../../Projectiles/wild_wind_proj/WildWindProj";
import Skill from "../../../Scr/Skills/Skill";

export default class WildWind extends Skill{

    constructor(template, player, gem) {
        super(template, player, gem)
        this.img_path = 'src/assets/img/icons/skill/wild_wind.png'
        this.init()

    }
    set(){
        this.min_damage = this.level * 14
        this.max_damage = this.level * 20
    }
    getDamage(){
        // return new Damage(this.owner, this.getDamageValue(), Damage.DAMAGE_TYPE_SPELL,Damage.HIT, Damage.HIT_TYPE_AREA)
    }

    getDamageValue(){
        return Math.round(Math.random() * (this.max_damage - this.min_damage) + this.min_damage)
    }

    init(){
        this.description = 'Changes its direction, deals damage on contact.'
    }

    cast(fight_context, cords) {

        let player = fight_context.player
        let angle = Functions.angle(player, cords)

        let proj_speed = 1.5
        let ttl = 10000

        fight_context.projectiles.push(new WildWindProj(
            fight_context,
            player.point.x,
            player.point.y,
            this,
            proj_speed,
            ttl,
            angle
        ))
    }
}