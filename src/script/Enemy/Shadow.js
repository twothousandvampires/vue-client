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

        this.can_charge = true
        this.can_behavior = true

        this.speed = 2

        this.name = 'skeleton warrior'

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
        this.is_damaged = false

        this.frame = 0
        this.frame_timer = 0

        this.speed = 2

        //ms
        this.attack_speed = 1800
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

    getMoveAngle(input){
        if(input.w){
            if(input.d){
                this.move_angle = 2.36
            }
            else if(input.a){
                this.move_angle = 3.93
            }
            else {
                this.move_angle = 3.14
            }
        }
        else if(input.s){
            if(input.d){
                this.move_angle = 0.76
            }
            else if(input.a){
                this.move_angle = 5.5
            }
            else {
                this.move_angle = 0
            }
        }
        else if(input.a){
            this.move_angle = 4.71
        }
        else if(input.d){
            this.move_angle = 1.57
        }
    }

    moveInputIsPressed(input){
        return input.w || input.s || input.a || input.d
    }

    resetFrame(){
        this.frame = 0
        this.frame_timer = 0
    }

    setSize(x, y){
        this.size_x = x
        this.size_y = y
        this.sprite_w = x
        this.sprite_h = y
    }

    idle(){
        this.resetFrame()
        this.setSize(90, 99)
        this.is_idle = true
        this.is_move = false
        this.is_attack = false
        this.is_charge = false
        this.y_frame_offset = 0
        this.max_frame = 7
        this.frame_change_tick = 7
    }

    act(char){
        let distance_to_char = Functions.distance(this, char)

        if(this.frozen || this.stunned){
            //
        }
        else if(this.damaged){
            //
        }
        else if(this.is_attack){

        }
        else if(this.is_move){

        }
        else {
            if(distance_to_char < 500 && distance_to_char > 100 && this.can_charge){
                this.charge()
            }
            else if(distance_to_char > 500){
                this.move_angle = Math.random() * 6.14
                this.idleMove()
                setTimeout(()=>{
                    this.idle()
                },3000)
            }
            else if(distance_to_char < 500 && distance_to_char > 40){
                this.move(char)
            }
            else {
                this.attack()
            }
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

    attack(){
        this.resetFrame()
        this.is_attack = true
        this.y_frame_offset = 200
        this.max_frame = 6
        this.frame_change_tick = 2000/350
        setTimeout(()=>{
            this.deal_hit = false
            this.idle()
        },2000)
    }

    move(char){
        this.is_idle = false
        this.y_frame_offset = 100
        this.max_frame = 4
        this.frame_change_tick = 6
        this.is_move = true
        this.move_angle = Functions.angle(this, char)
        let move_x = Math.sin(this.move_angle)
        this.fliped = move_x <= 0;
        let move_y = Math.cos(this.move_angle)
        this.setCord(move_x, move_y)
    }
}