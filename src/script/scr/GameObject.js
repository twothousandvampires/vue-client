export default class GameObject{

    constructor(x, y) {
        this.cord_x = x
        this.cord_y = y
        this.fliped = false
        this.move_angle = 0
        this.direction_angle = false
        this.frame = 0
        this.frame_timer = 0
        this.y_frame_offset = 0
    }

    setCord(x ,y, m = 1){
        if(!(this.cord_x + x * this.speed * m >= 980) && !(this.cord_x + x * this.speed * m <= 180)){
            this.cord_x += x * this.speed * m
        }
        if(!(this.cord_y + y * this.speed * m >= 1180) && !(this.cord_y + y * this.speed * m <= 380)){
            this.cord_y += y * this.speed * m
        }
    }
}