import Enemy from "./Enemy.js";
import ImageData from "../ImageData.js";
import Functions from "../GameFunctions";
let data = new ImageData()

export default class Shadow extends Enemy{
    constructor(x, y, dist) {
        super(x, y ,dist)
        this.size_x = 90
        this.size_y = 99
        this.box_size_x = 50
        this.box_size_y = 25
        this.sprite_w = 90
        this.sprite_h = 99

        this.def_w = this.sprite_w
        this.def_h = this.sprite_h

        this.can_charge = true
        this.can_change_behavior = false
        this.wait_between_attack = false
        this.change_behavior_timeout = false

        this.speed = 2

        this.img_name = 'skeleton warrior'

        this.attack_range = 40
        this.looking_range = 200
        this.charge_distance = 500

        this.y_frame_offset = 0
        this.max_frame = 7
        this.frame_change_tick = 7 // 7 * 50(game_tick) = 350 ms

        this.can_move = true
        this.frozen = false
        this.stunned = false

        this.is_idle = true
        this.is_move = false
        this.deal_hit = false
        this.is_attack = false
        this.is_charge = false
        this.is_idle_move = false
        this.is_damaged = false

        this.attack_box = false

        this.frame = 0
        this.frame_timer = 0

        this.speed = 2

        //ms
        this.attack_speed = 1800
        this.idle()
    }

    getState(){
        if(this.is_idle){
            return 'idle'
        }
        if(this.is_move){
            return 'move'
        }
        if(this.is_attack){
            return 'attack'
        }
        if(this.damaged){
            return 'damage'
        }
        if(this.is_idle_move){
            return 'idle move'
        }
        return 'yo';
    }

    angleToAttackRect(angle){
        return {
            cord_x : this.cord_x + Math.sin(angle) * this.attack_range/2,
            cord_y : this.cord_y + Math.cos(angle) * this.attack_range/2,
            box_size_x : this.attack_range,
            box_size_y : this.attack_range
        }
    }

    setCord(x ,y, m = 1){
        if(!(this.cord_x + x * this.speed * m >= 1000) && !(this.cord_x + x * this.speed * m <= 200)){
            this.cord_x += x * this.speed * m
        }
        if(!(this.cord_y + y * this.speed * m >= 1200) && !(this.cord_y + y * this.speed * m <= 400)){
            this.cord_y += y * this.speed * m
        }
    }

    resetFrame(){
        this.frame = 0
        this.frame_timer = 0
        this.is_idle = false
        this.is_move = false
        this.is_idle_move = false
        this.is_attack = false
        this.is_charge = false
        this.damaged = false
    }

    setSize(x, y){
        this.size_x = x
        this.size_y = y
        this.sprite_w = x
        this.sprite_h = y
    }

    damage(angle){
        clearTimeout(this.change_behavior_timeout)
        this.resetFrame()
        this.damaged = true
        this.direction_angle = angle
        this.y_frame_offset = 300
        this.max_frame = 2
        this.frame_change_tick = 1
        setTimeout(()=>{
            this.idle(500)
        },1000)
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

    act(char){
        let distance_to_char = Functions.distance(this, char)
        if(this.can_change_behavior){

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
            this.setCord(move_x, move_y)
        }
        else if(this.is_attack){
            if(Functions.rectCollision(this.attack_box, char) && this.frame >= 4 && !char.damaged){
                char.damage(Functions.angle(this, char))
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
                this.setCord(move_x, move_y)
            }
        }
        else if(this.is_charge){
            let move_x = Math.sin(this.deriction_angle)
            this.fliped = move_x <= 0;
            let move_y = Math.cos(this.deriction_angle)
            this.setCord(move_x, move_y, 3)
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
                this.frame = 0
            }
        }
    }

    attack(char){
        clearTimeout(this.change_behavior_timeout)
        this.resetFrame()
        this.is_attack = true
        this.y_frame_offset = 199
        this.max_frame = 6
        this.attack_box = this.angleToAttackRect(Functions.angle(this, char))
        this.frame_change_tick = 2000/350
        this.wait_between_attack = true
        setTimeout(()=>{
            this.deal_hit = false
            this.wait_between_attack = false
            this.attack_box = false
            this.idle()
        },2000)
    }

    move(){
        this.resetFrame()
        this.is_move = true
        this.y_frame_offset = 100
        this.max_frame = 4
        this.frame_change_tick = 6
        this.change_behavior_timeout = setTimeout(()=>{
            this.idle()
        },3000)
    }

    idleMove(){
        this.resetFrame()
        this.is_idle_move = true
        this.y_frame_offset = 100
        this.max_frame = 4
        this.frame_change_tick = 6
        this.change_behavior_timeout = setTimeout(()=>{
            this.idle()
        },3000)
    }

    charge(){
        this.resetFrame()
        this.is_charge = true
        this.y_frame_offset = 400
        this.max_frame = 2
        this.frame_change_tick = 3
        this.change_behavior_timeout = setTimeout(()=>{
            this.idle()
        },3000)
    }
}