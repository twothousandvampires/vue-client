import Functions from "../../GameFunctions";
import FireCoilSprite from "./sprite/FireCoilSprite";
import FireExplosionBig from "../../Effects/FireExplosionBig/FireExplosionBig";
import Projectile from "../Projectile";
import Ignite from "../../Status/Ignite/Ignite";

export default class FireCoilProj extends Projectile{

    constructor(context, x, y ,angle, owner, speed) {
        super(context, x, y)
        this.owner = owner
        this.name = 'fire coil'
        this.angle = angle
        this.box_size_x = 10
        this.box_size_y = 10
        this.size_x = 40
        this.size_y = 40
        this.sprite = new FireCoilSprite(this)
        this.speed = speed

        this.explosion_radius = 50

        this.explosion_radius_width = 100
        this.explosion_radius_height = 100
    }

    act(){

        this.figth_context.enemy.forEach(elem => {
            if(Functions.rectCollision(this, elem)){
                this.explosion()
            }
        })

        let map = this.figth_context.map

        for(let i = 0; i < map.environment.length; i++){
            if(Functions.rectCollision(this, map.environment[i])){
                this.explosion()
            }
        }

        if(this.outOfMap()){
            this.explosion()
        }

        this.x_move = Math.sin(this.angle) * this.speed
        this.y_move = Math.cos(this.angle) * this.speed

        this.point.add(this.x_move, this.y_move)

        this.sprite.act()
    }

    explosion(){
        let explosion_effect = new FireExplosionBig( this.figth_context,
            this.point.x,
            this.point.y,
            this.explosion_radius_width,
            this.explosion_radius_height )

        this.figth_context.enemy.forEach(elem => {
            if(Functions.circleRectCollision(this, this.explosion_radius,elem)){
                elem.newStatus(new Ignite(40), this.owner)
            }
        })

        this.figth_context.newEffect(explosion_effect)
        this.figth_context.removeProj(this)
    }
}