import Functions from "../../../GameFunctions";
import FireCoilProj from "../../../Projectiles/FireCoilSprite/FireCoilProj";
import Skill from "../../../Scr/Skills/Skill";

export default class FireCoil extends Skill{
    constructor(template, player, gem) {
        super(template, player, gem)
        this.img_path = 'src/assets/img/icons/skill/fire_coil.png'
        this.init()
    }
    set(){
        this.proj_speed = 6
        this.min_damage = this.level * 4
        this.max_damage = this.level * 8
    }
    getDescription(){
        return this.description + '('  + this.min_damage + '-' + this.max_damage  + ')'
    }

    init(){
        this.description = 'it explodes'
        if(this.amplifications.has('long arc')){
            this.chain_range += this.amplifications.get('long arc').level * 80
        }

        if(this.amplifications.has('inexhaustible charge')){
            this.chain_limit += this.amplifications.get('inexhaustible charge').level * 1
        }
    }

    cast(fight_context, cords) {

        let player = fight_context.player
        let angle = Functions.angle(player, cords)

        fight_context.projectiles.push(new FireCoilProj(
            fight_context,
            player.point.x,
            player.point.y,
            angle,
            player,
            this.proj_speed
        ))

    }
}