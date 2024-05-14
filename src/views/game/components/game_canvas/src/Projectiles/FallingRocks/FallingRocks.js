import Projectile from "../Projectile";
import FallingRocksSprite from "./sprite/FallingRocksSprite";
import RocksJump from "../../Effects/RockJump/RocksJump";
import Functions from "../../GameFunctions";
import Damage from "../../Scr/Damage";
import Stun from "@/views/game/components/game_canvas/src/Status/Stun/Stun";
export default class FallingRocks extends Projectile{

    constructor(owner, context, x, y, z) {
        super(context, x, y);
        this.point.y = y - z
        this.y_end = y
        this.owner = owner
        this.name = 'falling rocks'
        this.sprite = new FallingRocksSprite(this)
        this.speed = Math.floor(Math.random() * (15 - 10) + 10)
        this.box_size_x = 30
        this.box_size_y = 30
        this.size_x = 50
        this.size_y = 50

        this.radius = 20

    }

    act(){
        this.point.y += this.speed
        if(this.point.y >= this.y_end){
            this.figth_context.enemy.forEach(elem => {
                if(Functions.circleRectCollision(this, this.radius, elem)){
                    elem.newStatus(new Stun(30000))
                    elem.takeDamage(new Damage(this, 10, Damage.DAMAGE_TYPE_PHYSICAL, Damage.HIT, Damage.HIT_TYPE_AREA, this.owner ))
                }
            })
            this.figth_context.effects.push(new RocksJump(this.figth_context,this.point.x, this.point.y,80,80))
            this.figth_context.projectiles.splice(this.figth_context.projectiles.indexOf(this),1)
        }
    }

}