import Functions from "../../GameFunctions";
import Skull from "../skull/Skull";
import GiantUndeadSprite from "./sprite/GiantUndeadSprite";
import Undead from "../src/Undead";
import RocksJump from "../../Effects/RockJump/RocksJump";
import Point from "../../Scr/Point";
import Damage from "../../Scr/Damage";

export default class GiantUndead extends Undead{
    constructor(context, x, y) {
        super(context, x, y)
        this.name = 'giant undead'
        this.skull_will_spawned = Math.random() > 0.5
        this.state = undefined
        this.behavior_timer = 0
        this.move_angle = undefined
        this.size_x = 144
        this.size_y = 144
        this.box_size_x = 60
        this.box_size_y = 25

        this.min_attack_damage = 10
        this.max_attack_damage = 25

        this.life = 40
        this.max_life = 40
        this.movement_speed = 1.2
        this.attack_speed = 2500
        this.attack_range = 40
        this.looking_range = 400
        this.sprite = new GiantUndeadSprite(this)
        this.attack_area_radius = 20
        this.attack_point = undefined
        this.init()
    }
    dyingAct(){
        if(this.sprite.sprite_end){
            if(this.skull_will_spawned){
                let i = 0
                while (i < 3){
                    this.figth_context.addEnemyToBattle(new Skull(this.figth_context, 0,  0), this.point.x + (i * 15), this.point.y)
                    i++
                }
            }
            this.deadState()
        }
    }

    attackAct(){
        let player = this.figth_context.player

        if(!this.deal_hit && this.sprite.frame === 9){
            this.figth_context.effects.push(new RocksJump(this.figth_context, this.attack_point.x, this.attack_point.y,60,60))
            if(this.playerInDamageArea(player)){
                this.deal_hit = true
                player.takeDamage(this.getDamage())
            }
        }
        if(this.sprite.sprite_end){
            this.getState()
        }
    }

    playerInDamageArea(player){
        let player_rect = {
            size_x: player.box_size_x,
            size_y: player.box_size_y,
            point: player.point
        }
        return  Functions.circleRectCollision({point: this.attack_point}, this.attack_area_radius, player_rect)
    }
    playerInAttackRadius(player){
        let player_rect = {
            size_x: player.box_size_x,
            size_y: player.box_size_y,
            point: player.point
        }
        return  Functions.circleRectCollision(this, this.attack_range, player_rect)
    }

    getState(){
        let player = this.figth_context.player
        let distance_to_player = Functions.distance(this, player)

        let range = this.getLookingRange()

        if(!player.invisible && !player.dead && this.playerInAttackRadius(player)){
            let x = player.point.x
            let y = player.point.y
            this.attack_point = new Point(x,y)
            this.attackState()
        }
        else if (!player.invisible && !player.dead && distance_to_player < range){
            this.pursuitState()
        }
        else {
            if( Math.random() > 0.5){
                let angle = Math.random() * 6.24
                this.moveState(angle)
            }
            else {
                this.idleState()
            }
        }
    }

    getDamage(){
        return new Damage(
            this.attack_point,
            this.getAttackDamage(),
            Damage.DAMAGE_TYPE_PHYSICAL,
            Damage.HIT,
            Damage.HIT_TYPE_MELEE,
            this
        )
    }
}