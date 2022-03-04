import Enemy from "./Enemy.js";
import ImageData from "../ImageData.js";
let data = new ImageData()

export default class Shadow extends Enemy{
    constructor(x, y, dist) {
        super(x, y ,dist);
        this.image = {
            frame_timer : 0,
            frame : 0,
            src : data.getImage('shadow_enemy'),
            'idle' : {
                sprite_size_w : 90,
                sprite_size_h : 90,
                y_offset : 0,
                max_frame : 6
            },
            'move' : {
                sprite_size_w : 90,
                sprite_size_h : 90,
                y_offset : 90,
                max_frame : 5,
            }
        }
        this.speed = 2
    }
}