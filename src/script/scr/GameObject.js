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

    setCord(x ,y, map){
        console.log(map)
        if(!(this.cord_x + x * this.speed  >= map.start_x + map.width) && !(this.cord_x + x * this.speed <= map.start_x)){
            this.cord_x += x * this.speed
        }
        if(!(this.cord_y + y * this.speed >= map.start_y + map.height) && !(this.cord_y + y * this.speed <= map.start_y)) {
            this.cord_y += y * this.speed
        }
    }
}