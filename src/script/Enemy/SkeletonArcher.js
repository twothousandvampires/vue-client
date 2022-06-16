import Enemy from "./src/Enemy.js";
import Functions from "../GameFunctions";
import SkeletonSkull from "./SkeletonSkull";
import Arrow from "../projectiles/arrow";

export default class SkeletonArcher extends Enemy{

    constructor(x, y) {
        super(x, y);
        this.skull_spawned = Math.random() > 0.5
        this.is_resurected = false
        this.size_y = 99
        this.box_size_x = 50
        this.box_size_y = 25
        this.sprite_w = 90
        this.sprite_h = 99
        this.def_w = this.sprite_w
        this.def_h = this.sprite_h
        this.wait_between_attack = false
        this.img_name = 'skeleton archer'
        this.looking_range = 500
        this.y_frame_offset = 0
        this.attack_speed = 2500
        this.max_frame = 7
        this.frame_change_tick = 7 // 7 * 50(game_tick) = 350 ms
        this.is_charge = false
        this.life = 2
        this.speed = 2

        //ms
        this.idle()
    }

    resetFrame(){
        this.is_resurected = false
        this.frame = 0
        this.frame_timer = 0
        this.is_idle = false
        this.is_move = false
        this.is_idle_move = false
        this.is_attack = false
        this.damaged = false
        this.deal_hit = false
        this.wait_between_attack = false
    }

    setBehaviorTimer(ms, idle_ms){
        clearTimeout(this.change_behavior_timeout)
        this.change_behavior_timeout = setTimeout(()=>{
            this.idle(idle_ms)
        }, ms)
    }

    act(char, fight){
        let distance_to_char = Functions.distance(this, char)
        if(this.is_resurected){

        }
        if(this.is_dead){

        }
        else if(this.can_change_behavior){
            if(distance_to_char < this.looking_range && !this.wait_between_attack){
                this.attack(char)
            }
            else {
                this.deriction_angle = Math.random() * 6.14
                this.idleMove()
            }
            this.can_change_behavior = false
        }

        else if(this.frozen || this.stunned){

        }
        else if(this.damaged){
            let move_x = Math.sin(this.direction_angle)
            let move_y = Math.cos(this.direction_angle)
            this.setCord(move_x, move_y, fight.map)
        }
        else if(this.is_attack){
            if(!this.deal_hit && this.frame === 6){
                this.deal_hit = true
                fight.proj.push(new Arrow(this.cord_x+5, this.cord_y-50, Functions.angle({cord_x : this.cord_x,cord_y : this.cord_y-50}, char)))
            }
        }
        else if(this.is_idle_move){
            let move_x = Math.sin(this.deriction_angle)
            this.fliped = move_x <= 0;
            let move_y = Math.cos(this.deriction_angle)
            this.setCord(move_x, move_y , fight.map)
        }

        this.frame_timer ++
        if(this.frame_timer >= this.frame_change_tick){
            this.frame_timer = 0
            if(this.is_resurected){
                this.frame --
                if(this.frame < 0){
                    this.is_dead = false
                    this.skull_spawned = Math.random() > 0.5
                    this.idle(1000)
                }
            }
            else{
                this.frame ++
                if(this.frame >= this.max_frame){
                    if(this.is_dead){
                        if(this.skull_spawned && !this.skull_was_spawn){
                            fight.enemy.push(new SkeletonSkull(this.cord_x, this.cord_y))
                            this.skull_was_spawn = true
                        }
                        this.frame = this.max_frame - 1
                    }
                    else {
                        this.frame = 0
                    }
                }
            }
        }
    }

    dead(){
        this.resetFrame()
        this.setSize(90, 99)
        this.is_dead = true
        this.y_frame_offset = 400
        this.max_frame = this.skull_spawned ? 9 : 8
        this.frame_change_tick = 3
    }

    damage(angle){
        this.resetFrame()
        this.damaged = true
        this.life--
        if(this.life <= 0 ){
            clearTimeout(this.change_behavior_timeout)
            this.dead()
            return
        }
        this.direction_angle = angle
        this.y_frame_offset = 300
        this.max_frame = 2
        this.frame_change_tick = 1
        this.setBehaviorTimer(1000, 500)
    }

    idle(ms = Math.random() * (2500 - 1000) + 1000){
        this.resetFrame()
        this.setSize(90, 99)
        this.is_idle = true
        this.y_frame_offset = 0
        this.max_frame = 5
        this.frame_change_tick = 7
        this.change_behavior_timeout = setTimeout(()=>{
            this.can_change_behavior = true
        },ms)
    }

    attack(char){
        this.resetFrame()
        this.is_attack = true
        this.y_frame_offset = 199
        this.max_frame = 9
        this.frame_change_tick = this.attack_speed/350
        this.wait_between_attack = true
        this.setBehaviorTimer(this.attack_speed,3000)
    }

    resurect(){
        this.is_resurected = true
        this.frame = 8
    }

    idleMove(){
        this.resetFrame()
        this.is_idle_move = true
        this.y_frame_offset = 100
        this.max_frame = 4
        this.frame_change_tick = 6
        this.setBehaviorTimer(3000)
    }
}