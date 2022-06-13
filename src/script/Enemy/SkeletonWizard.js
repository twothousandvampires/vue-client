import Enemy from "./src/Enemy";
import Functions from "../GameFunctions";
import SkeletonSkull from "./SkeletonSkull";

export default class SkeletonWizard extends Enemy{

    constructor(x, y) {
        super(x, y);
        this.skull_spawned = Math.random() > 0.5
        this.size_x = 90
        this.size_y = 99
        this.box_size_x = 50
        this.box_size_y = 25
        this.is_cast = false
        this.sprite_w = 90
        this.sprite_h = 99
        this.def_h = this.sprite_h
        this.wait_between_cast = false
        this.img_name = 'skeleton wizard'
        this.deal_cast = false
        this.looking_range = 500
        this.y_frame_offset = 0
        this.cast_speed = 2500
        this.max_frame = 7
        this.frame_change_tick = 7 // 7 * 50(game_tick) = 350 ms
        this.is_charge = false
        this.life = 2
        this.speed = 2

        //ms
        this.idle()
    }

    resetFrame(){
        this.frame = 0
        this.frame_timer = 0
        this.is_idle = false
        this.is_idle_move = false
        this.is_cast = false
        this.damaged = false
        this.deal_cast = false
        this.wait_between_cast = false
    }

    setBehaviorTimer(ms, idle_ms){
        clearTimeout(this.change_behavior_timeout)
        this.change_behavior_timeout = setTimeout(()=>{
            this.idle(idle_ms)
        }, ms)
    }

    act(char, effects, enemy, proj){
        let distance_to_char = Functions.distance(this, char)
        if(this.is_dead){

        }
        else if(this.can_change_behavior){
            if(!this.wait_between_cast){
                this.cast()
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
            this.setCord(move_x, move_y)
        }
        else if(this.is_cast){
            if(!this.deal_cast && this.frame === 7){
                this.deal_cast = true
                let to_resurect = enemy.filter(elem => {
                    return elem.is_dead && !elem.skull_was_spawn && !elem.is_resurected && elem.img_name != 'skeleton wizard'
                })
                if(to_resurect.length){
                    to_resurect[0].resurect()
                }
            }
        }
        else if(this.is_idle_move){
            let move_x = Math.sin(this.deriction_angle)
            this.fliped = move_x <= 0;
            let move_y = Math.cos(this.deriction_angle)
            this.setCord(move_x, move_y)
        }

        this.frame_timer ++
        if(this.frame_timer >= this.frame_change_tick){
            this.frame_timer = 0
            this.frame ++
            if(this.frame >= this.max_frame){
                if(this.is_dead){
                    if(this.skull_spawned){
                        enemy.push(new SkeletonSkull(this.cord_x, this.cord_y))
                        this.skull_spawned = false
                    }
                    this.frame = this.max_frame - 1
                }
                else {
                    this.frame = 0
                }
            }
        }
    }

    dead(){
        this.resetFrame()
        this.setSize(90, 99)
        this.is_dead = true
        this.y_frame_offset = 400
        this.max_frame = this.skull_spawned ? 10 : 9
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

    cast(){
        this.resetFrame()
        this.is_cast = true
        this.y_frame_offset = 199
        this.max_frame = 10
        this.frame_change_tick = (this.cast_speed/50)/10
        this.wait_between_cast = true
        this.setBehaviorTimer(this.cast_speed,3000)
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