import Enemy from "./Enemy";
import Functions from "../GameFunctions";
import EffectCreator from "../Effects/EffectCreator";

export default class SkeletonSkull extends Enemy{
    constructor(x, y) {
        super(x, y)
        this.size_x = 36
        this.size_y = 36
        this.box_size_x = 20
        this.box_size_y = 12
        this.sprite_w = 36
        this.sprite_h = 36
        this.corpse = false
        this.def_w = this.sprite_w
        this.def_h = this.sprite_h
        this.wait_between_attack = false
        this.speed = 3
        this.img_name = 'skeleton skull'
        this.attack_range = 30
        this.max_frame = 6
        this.frame_change_tick = 3 // 7 * 50(game_tick) = 350 ms
        this.life = 1
        this.attack_box = false

        //ms
        this.attack_speed = 1200
        this.idle()
    }

    resetFrame(){
        if(!this.is_dead){
            this.frame = 0
            this.frame_timer = 0
            this.is_move = false
            this.is_attack = false
            this.damaged = false
            this.deal_hit = false
            this.attack_box = false
        }
    }

    act(char){
        let distance_to_char = Functions.distance(this, char)
        if(this.is_dead){

        }
        else if(this.frozen || this.stunned){

        }
        else if(this.damaged){
            let move_x = Math.sin(this.direction_angle)
            let move_y = Math.cos(this.direction_angle)
            this.setCord(move_x, move_y)
        }
        else if(this.is_attack){
            if(!this.deal_hit && this.frame === 5){
                this.deal_hit = true
                if(Functions.rectCollision(this.attack_box, char) && !char.damaged){
                    char.damage(Functions.angle(this, char))
                }
            }
        }
        else{
            if(distance_to_char > 50){
                if(!this.is_move){
                    this.move()
                }
                this.move_angle = Functions.angle(this, char)
                let move_x = Math.sin(this.move_angle)
                this.fliped = move_x <= 0;
                let move_y = Math.cos(this.move_angle)
                this.setCord(move_x, move_y)
            }
            else if(this.wait_between_attack){
                if(!this.is_idle){
                    this.idle()
                }
            }
            else {
                this.attack(char)
            }
        }

        this.frame_timer ++
        if(this.frame_timer >= this.frame_change_tick){
            this.frame_timer = 0
            this.frame ++
            if(this.frame >= this.max_frame){
                if(this.is_dead){
                    this.frame = 100
                }
                else {
                    this.frame = 0
                }
            }
        }
    }

    idle(){
        this.resetFrame()
        this.setSize(36, 36)
        this.is_idle = true
        this.y_frame_offset = 0
        this.max_frame = 1
        this.frame_change_tick = 100
    }

    dead(){
        this.resetFrame()
        this.setSize(36, 36)
        this.is_dead = true
        this.y_frame_offset = 72
        this.max_frame = 4
        this.frame_change_tick = 2
    }

    damage(angle){
        this.resetFrame()
        this.damaged = true
        this.life--
        if(this.life <= 0 ){
            this.dead()
            return
        }
        this.direction_angle = angle
        this.y_frame_offset = 300
        this.max_frame = 2
        this.frame_change_tick = 1
        this.setBehaviorTimer(1000, 500)
    }

    attack(char){
        this.resetFrame()
        this.is_attack = true
        this.y_frame_offset = 36
        this.max_frame = 8
        this.attack_box = this.angleToAttackRect(Functions.angle(this, char))
        this.frame_change_tick = 1200/350
        this.wait_between_attack = true
        setTimeout(()=>{
            this.resetFrame()
            setTimeout(()=>{
              this.wait_between_attack  = false
            },1500)
        },1200)
    }

    move(){
        this.resetFrame()
        this.is_move = true
        this.y_frame_offset = 0
        this.max_frame = 6
        this.frame_change_tick = 1
    }
}