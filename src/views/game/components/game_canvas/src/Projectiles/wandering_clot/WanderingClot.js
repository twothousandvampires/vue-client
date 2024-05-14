import Functions from "../../GameFunctions";
import WanderingClotEnd from "../../Effects/WanderingClotEnd/WanderingClotEnd";
import WanderingClotSprite from "./sprite/WanderingClotSprite";
import GameObject from "../../Scr/GameObject";
import Damage from "../../Scr/Damage";

export default class WanderingClot extends GameObject{
    constructor(context, x, y, skill, owner, speed, angle_limit, time_to_live, damage_interval, radius, angle) {
        super(context, x, y)
        this.start_angle = angle
        this.angle = angle
        this.skill = skill
        this.owner = owner
        this.speed = speed
        this.angle_limit = angle_limit
        this.time_to_live = Math.round(time_to_live / 40)
        this.created_tick = context.tick
        this.radius = radius
        this.damage_interaval =  Math.round(damage_interval / 40)

        this.box_size_x = 40
        this.box_size_y = 20
        this.size_x = 40
        this.size_y = 40
        this.sprite = new WanderingClotSprite(this)
        this.phased = true
    }

    getMovementSpeed(){
        return this.speed
    }

    act(){
        if(this.time_to_live + this.created_tick < this.figth_context.tick){
            this.figth_context.effects.push(new WanderingClotEnd(this.figth_context, this.point.x, this.point.y,this.size_x,this.size_y))
            this.figth_context.projectiles.splice(this.figth_context.projectiles.indexOf(this),1)
            this.skill.endProj(this)
            return
        }
        if(this.figth_context.tick % 3 === 0){
            if(this.angle_limit){
                        let max_new_angle = this.start_angle + 1.2
                        let min_new_angle = this.start_angle - 1.2

                        let new_angle = Math.random() * 0.5 * (Math.random() > 0.5 ? -1 : 1)
                        if(new_angle + this.angle > max_new_angle || new_angle + this.angle < min_new_angle){
                            new_angle *= -1
                        }
                        this.angle += new_angle


                    }
                    else {
                        this.angle += Math.random() * 0.5 * (Math.random() > 0.5 ? -1 : 1)
                    }
        }
        if(this.figth_context.tick % this.damage_interaval === 0){
            this.figth_context.enemy.forEach(elem => {
                        if(Functions.circleRectCollision(this,this.radius,elem,true) && elem.noDead()){
                            elem.takeDamage(new Damage(this.owner,
                                                             this.skill,
                                                             this.skill.getDamage(),
                                                             Damage.DAMAGE_TYPE_SPELL,
                                                             Damage.HIT_TYPE_HIT,
                                                             Damage.HIT_SOURCE_TYPE_SPELL,
                                )
                            )
                        }
                    })
        }
        let angle = this.angle
        this.x_move = Math.sin(angle)
        this.y_move = Math.cos(angle)
        this.setCord(this.x_move, this.y_move)

        this.sprite.act()
    }
}