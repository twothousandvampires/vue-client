import Functions from "../../GameFunctions";
import WildWindSprite from "./sprite/WildWindSprite";
import Projectile from "@/views/game/components/game_canvas/src/Projectiles/Projectile";

export default class WildWindProj extends Projectile{
    constructor(context, x, y, skill, speed, angle_limit, ttl, damage_interval, radius, angle) {
        super(context, x, y)
        this.start_angle = angle
        this.direction_angle = angle
        this.skill = skill
        this.speed = speed
        this.time_to_live = ttl

        this.box_size_x = 20
        this.box_size_y = 20
        this.size_x = 40
        this.size_y = 40
        this.sprite = new WildWindSprite(this)
        this.phased = true
        this.damage_interval = damage_interval

        this.delete_interval = setTimeout(()=>{
            this.clearIntervals()
            this.destroy()
            this.skill.end(this)
        },this.time_to_live)

        this.damage_check_interval = setInterval(()=>{
            this.figth_context.enemy.forEach(elem => {
                if(Functions.rectCollision(this, elem) && !elem.isDead()){
                    elem.takeSpellDamage(this.skill.getDamageDescription() ,this.skill.player)
                }
            })
        },this.damage_interval)

        this.change_direction_interval = setInterval(()=>{
            let max_new_angle = this.start_angle + 1.2
            let min_new_angle = this.start_angle - 1.2

            let new_angle = Math.random() * 0.5 * (Math.random() > 0.5 ? -1 : 1)
            if(new_angle + this.angle > max_new_angle || new_angle + this.angle < min_new_angle){
                new_angle *= -1
            }
            this.direction_angle += new_angle
        },100)
    }

    clearIntervals(){
        clearInterval(this.damage_check_interval)
        clearInterval(this.change_direction_interval)
        clearTimeout(this.delete_interval)
    }

    act(){
        this.x_move = Math.sin(this.direction_angle) * this.getMovementSpeed()
        this.y_move = Math.cos(this.direction_angle) * this.getMovementSpeed()
        this.addPointIfPossible(this.x_move, this.y_move)
        this.sprite.act()
    }
}