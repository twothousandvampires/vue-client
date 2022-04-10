import Enemy from "./Enemy.js";
import ImageData from "../ImageData.js";
import Functions from "../GameFunctions";
let data = new ImageData()

export default class Reaper extends Enemy{
    constructor(x, y, dist) {
        super(x, y ,dist);
        this.size_x = 90 + 200
        this.size_y = 90 + 400
        this.box_size_x = 70
        this.box_size_y = 35
        this.attack_speed = 3000;
        this.image = {
            default_sprite_size_x : 120,
            default_sprite_size_y : 120,
            frame_timer : 0,
            frame : 0,
            src : data.getImage('reaper_enemy'),
            'idle' : {
                sprite_size_w : 120,
                sprite_size_h : 120,
                y_offset : 0,
                max_frame : 6,
                tick : ()=> {return  4 }
            },
            'charge' : {
                sprite_size_w : 120,
                sprite_size_h : 120,
                y_offset : 0,
                max_frame : 6,
                tick : ()=> {return  4 }
            },
            'move' : {
                sprite_size_w : 120,
                sprite_size_h : 120,
                y_offset : 120,
                max_frame : 6,
                tick : ()=> {return  4 }
            },
            'retreat' : {
                sprite_size_w : 120,
                sprite_size_h : 120,
                y_offset : 120,
                max_frame : 6,
                tick : ()=> {return  4 }
            },
            'around' : {
                sprite_size_w : 120,
                sprite_size_h : 120,
                y_offset : 120,
                max_frame : 6,
                tick : ()=> {return  4}
            },
            'attack' : {
                sprite_size_w : 240,
                sprite_size_h : 240,
                y_offset : 240,
                max_frame : 9,
                tick : ()=> {return Math.floor(this.attack_speed/450)}
            }
        }
        this.speed = 2
    }

    idleBehavior(char){
        if(!this.change_behavior_time){
            if(Functions.distance(this,char) > 150){
                this.move_offset = (Math.random() * (0.3)).toFixed(2)
                this.setBehavior('move',2000)
            }
            else {
                let rng = (Math.random()).toFixed(1)
                if( rng > 0.5 ){
                    this.move_offset = Math.random() > 0.5 ? 1.57 : -1.57
                    this.setBehavior('around',2000)
                }
                else {
                    this.setBehavior('idle',4000)
                }
            }
        }
    }
}