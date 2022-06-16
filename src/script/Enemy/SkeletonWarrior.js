import Enemy from "./src/Enemy.js";
import Functions from "../GameFunctions";
import EffectCreator from "../Effects/EffectCreator";
import SkeletonSkull from "./SkeletonSkull";

export default class SkeletonWarrior extends Enemy{
    constructor(x, y) {
        super(x, y)
        this.skull_spawned = Math.random() > 0.5
        this.size_x = 90
        this.size_y = 99
        this.box_size_x = 50
        this.box_size_y = 25
        this.is_resurected = false
        this.sprite_w = 90
        this.sprite_h = 99
        this.def_w = this.sprite_w
        this.def_h = this.sprite_h
        this.can_charge = true
        this.wait_between_attack = false
        this.speed = 2
        this.img_name = 'skeleton warrior'
        this.attack_range = 40
        this.looking_range = 200
        this.charge_distance = 500
        this.y_frame_offset = 0
        this.max_frame = 7
        this.frame_change_tick = 7 // 7 * 50(game_tick) = 350 ms
        this.is_charge = false
        this.life = 2
        this.attack_box = false
        this.speed = 2

        //ms
        this.attack_speed = 1800
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
        this.is_charge = false
        this.damaged = false
        this.deal_hit = false
        this.wait_between_attack = false
        this.attack_box = false
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

            if(distance_to_char < 50 && !this.wait_between_attack){
                this.attack(char)
            }
            else if(distance_to_char >= 50 && distance_to_char < 300){
                this.move()
            }
            else if(distance_to_char > 200 && distance_to_char < 400 && this.can_charge){
                this.deriction_angle = Functions.angle(this, char)
                this.charge()
            }
            else if(distance_to_char >= 300 && distance_to_char < 400){
                this.move()
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
            if(!this.deal_hit && this.frame === 4){
                this.deal_hit = true
                fight.effects.push(EffectCreator.createEffect('weapon swing', this.attack_box.cord_x, this.attack_box.cord_y, this.attack_box.box_size_x, this.attack_box.box_size_y, this.attack_box.angle))
                if(Functions.rectCollision(this.attack_box, char) && !char.damaged){
                    char.damage(Functions.angle(this, char))
                }
            }
        }
        else if(this.is_move){
            if(distance_to_char < 50){
                this.attack(char)
            }
            else {
                this.move_angle = Functions.angle(this, char)
                let move_x = Math.sin(this.move_angle)
                this.fliped = move_x <= 0;
                let move_y = Math.cos(this.move_angle)
                this.setCord(move_x, move_y, fight.map)
            }
        }
        else if(this.is_charge){
            let move_x = Math.sin(this.deriction_angle)
            this.fliped = move_x <= 0;
            let move_y = Math.cos(this.deriction_angle)
            this.setCord(move_x, move_y, fight.map)
        }
        else if(this.is_idle_move){
            let move_x = Math.sin(this.deriction_angle)
            this.fliped = move_x <= 0;
            let move_y = Math.cos(this.deriction_angle)
            this.setCord(move_x, move_y, fight.map)
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
        this.y_frame_offset = 500
        this.max_frame = this.skull_spawned ? 8 : 7
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
        this.max_frame = 7
        this.frame_change_tick = 7
        this.change_behavior_timeout = setTimeout(()=>{
            this.can_change_behavior = true
        },ms)
    }

    attack(char){
        this.resetFrame()
        this.is_attack = true
        this.y_frame_offset = 199
        this.max_frame = 6
        this.attack_box = this.angleToAttackRect(Functions.angle(this, char))
        this.frame_change_tick = 2000/350
        this.wait_between_attack = true
        this.setBehaviorTimer(2000)
    }

    move(){
        this.resetFrame()
        this.is_move = true
        this.y_frame_offset = 100
        this.max_frame = 4
        this.frame_change_tick = 6
        this.setBehaviorTimer(3000)
    }

    idleMove(){
        this.resetFrame()
        this.is_idle_move = true
        this.y_frame_offset = 100
        this.max_frame = 4
        this.frame_change_tick = 6
        this.setBehaviorTimer(3000)
    }

    charge(){
        this.resetFrame()
        this.is_charge = true
        this.can_charge = false
        this.y_frame_offset = 400
        this.max_frame = 2
        this.frame_change_tick = 3
        setTimeout(()=>{
            this.can_charge  = true
        },10000)
        this.setBehaviorTimer(3000)
    }

    resurect(){
        this.is_resurected = true
        this.frame = 8
    }
}