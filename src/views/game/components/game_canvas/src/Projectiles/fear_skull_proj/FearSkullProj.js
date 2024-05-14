import Functions from "../../GameFunctions";
import MagicExplosion from "../../Effects/MagicExplosion/MagicExplosion";
import Fear from "../../Status/Fear/Fear";
import FuryOfTheDead from "../../Status/UnholyFury/FuryOfTheDead";
import FearSkullSprite from "./sprite/FearSkullSprite";
import GameFunctions from "../../GameFunctions";
import Projectile from "../Projectile";

export default class FearSkullProj extends Projectile{
    constructor(context, x, y, angle ,owner) {
        super(context, x, y)
        this.owner = owner
        this.name = 'skull of fear'
        this.angle = angle
        this.hitted = []
        this.chance_to_proc = 20
        this.box_size_x = 10
        this.box_size_y = 10
        this.size_x = 40
        this.size_y = 40
        this.sprite = new FearSkullSprite(this)
        this.speed = 4.4

        this.explosion_radius_width = 40
        this.explosion_radius_height = 40
        this.phased = true
    }

    getDamage(){
        return  {
            'type': 'magic',
            'value': 10,
            'force': false,
            'source': this
        }
    }
    getMovementSpeed(){
        return this.speed
    }
    act(){
        let player = this.figth_context.player

        this.figth_context.enemy.forEach(elem => {
            if(Functions.rectCollision(this, elem) && elem != this.owner){
                elem.newStatus(new FuryOfTheDead())
            }
        })

        if(!player.dead && GameFunctions.rectCollision(this, player)){
            player.newStatus(new Fear(), this)
            let proj = this.figth_context.projectiles
            proj.splice(proj.indexOf(this),1)
            return
        }

        let map = this.figth_context.map
        for(let i = 0; i < map.environment.length; i++){
            if(Functions.rectCollision(this, map.environment[i])){
                this.destroy()
                return
            }
        }

        if(this.outOfMap()){
            this.destroy()
            return
        }

        let angle = this.angle
        let total_speed = this.getMovementSpeed()

        let x_move = Math.sin(angle) * total_speed
        let y_move = Math.cos(angle) * total_speed

        this.point.add(x_move, y_move)

        this.sprite.act()
    }


    destroy() {
        let proj = this.figth_context.projectiles
        this.figth_context.effects.push(new MagicExplosion(this.figth_context,this.point.x,this.point.y,80,80))
        proj.splice(proj.indexOf(this),1)
    }
}