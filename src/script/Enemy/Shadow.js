import Enemy from "./Enemy.js";
import ImageData from "../ImageData.js";
import Functions from "../GameFunctions";
let data = new ImageData()

export default class Shadow extends Enemy{
    constructor(x, y, dist) {
        super(x, y ,dist);
        this.size_x = 50
        this.size_y = 50
        this.box_size_x = 50
        this.box_size_y = 25
        this.can_charge = true
        this.speed = 2
        this.attack_range = 20
        this.looking_range = 200
        this.charge_distance = 500
        //ms
        this.attack_speed = 1800
        this.image = {
            default_sprite_size_x : 90,
            default_sprite_size_y : 90,
            frame_timer : 0,
            frame : 0,
            src : data.getImage('shadow_enemy'),
            'idle' : {
                sprite_size_w : 90,
                sprite_size_h : 90,
                y_offset : 0,
                max_frame : 6,
                tick : ()=> {return  4 }
            },
            'charge' : {
                sprite_size_w : 90,
                sprite_size_h : 90,
                y_offset : 0,
                max_frame : 6,
                tick : ()=> {return  5 }
            },
            'move' : {
                sprite_size_w : 90,
                sprite_size_h : 90,
                y_offset : 90,
                max_frame : 5,
                tick : ()=> {return  4 }
            },
            'retreat' : {
                sprite_size_w : 90,
                sprite_size_h : 90,
                y_offset : 90,
                max_frame : 5,
                tick : ()=> {return  4 }
            },
            'around' : {
                sprite_size_w : 90,
                sprite_size_h : 90,
                y_offset : 90,
                max_frame : 5,
                tick : ()=> {return  4 }
            },
            'attack' : {
                sprite_size_w : 120,
                sprite_size_h : 120,
                y_offset : 180,
                max_frame : 7,
                tick : ()=> {return Math.floor(this.attack_speed/350)}
            }
        }
    }

    angleToAttackRect(angle){
        if(angle < 0.39 || angle > 5.85){
            return {
                cord_x : this.cord_x - this.box_size_x/2,
                cord_y : this.cord_y + this.box_size_y/2,
                box_size_x : this.box_size_x,
                box_size_y : this.attack_range
            }
        }
        if(angle > 0.39 && angle < 1.18){
            return {
                cord_x : this.cord_x + this.box_size_x/2,
                cord_y : this.cord_y + this.box_size_y/2,
                box_size_x : this.attack_range,
                box_size_y : this.attack_range
            }
        }
        if(angle > 1.18 && angle < 1.97){
            return {
                cord_x : this.cord_x + this.box_size_x/2,
                cord_y : this.cord_y - this.box_size_y/2,
                box_size_x : this.attack_range,
                box_size_y : this.box_size_y
            }
        }
        if(angle > 1.97 && angle < 2.76){
            return {
                cord_x : this.cord_x + this.box_size_x/2,
                cord_y : this.cord_y - this.box_size_y/2 - this.attack_range/2,
                box_size_x : this.attack_range,
                box_size_y : this.attack_range/2
            }
        }
        if(angle > 2.76 && angle < 3.55){
            return {
                cord_x : this.cord_x - this.box_size_x/2,
                cord_y : this.cord_y - this.box_size_y/2 - this.attack_range/2,
                box_size_x : this.box_size_x,
                box_size_y : this.attack_range/2
            }
        }
        if(angle > 3.55 && angle < 4.34){
            return {
                cord_x : this.cord_x - this.box_size_x/2 - this.attack_range,
                cord_y : this.cord_y - this.box_size_y/2 - this.attack_range/2,
                box_size_x : this.attack_range,
                box_size_y : this.attack_range/2
            }
        }
        if(angle > 4.43 && angle < 5.13){
            return {
                cord_x : this.cord_x - this.box_size_x/2 - this.attack_range,
                cord_y : this.cord_y - this.box_size_y/2,
                box_size_x : this.attack_range,
                box_size_y : this.box_size_y
            }
        }
        if(angle > 5.13 && angle < 5.85){
            return {
                cord_x : this.cord_x - this.box_size_x/2 - this.attack_range,
                cord_y : this.cord_y + this.box_size_y/2,
                box_size_x : this.attack_range,
                box_size_y : this.attack_range
            }
        }
    }

    idleBehavior(char){
        if(this.direct_move_vector){
            this.setCord(Math.sin(this.direct_move_vector),Math.cos(this.direct_move_vector))
        }
        if(!this.change_behavior_time){
            let rng = (Math.random()).toFixed(1);
            let distance_to_player = Functions.distance(this,char)
            if(Functions.distance(this,char) > this.looking_range){
                this.setBehavior('idle',2000)
                if(rng > 0.5) this.direct_move_vector = (Math.random() * 6.24).toFixed(2)
                else this.direct_move_vector = undefined
            }
            else{
                if(distance_to_player <= this.charge_distance && distance_to_player > 300 && this.can_charge){
                    let angle = Functions.angle(this, char)
                    this.start_point_x = this.cord_x
                    this.start_point_y = this.cord_y
                    this.charge_angle = angle
                    this.speed = 4
                    this.setBehavior('charge')
                }
                else if (distance_to_player > this.charge_distance){
                    this.move_offset = (Math.random() * (0.3)).toFixed(2)
                    this.setBehavior('move',2000)
                }
                else if(distance_to_player <= 300 && distance_to_player > 50){
                    if(rng > 0.7){
                        this.setBehavior('around',2000)
                    }
                    else {
                        this.setBehavior('move',2000)
                    }
                }
                else {
                    this.setBehavior('attack',this.attack_speed)
                }
            }
        }
    }
}