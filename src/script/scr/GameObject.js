import Functions from "../GameFunctions";
export default class GameObject {

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

    setCord(x, y, map) {

        if ( !this.collWithRocks(map, x, true) && !(this.cord_x + x * this.speed >= map.start_x + map.width) && !(this.cord_x + x * this.speed <= map.start_x)) {
            this.cord_x += x * this.speed
        }
        if ( !this.collWithRocks(map, y, false) && !(this.cord_y + y * this.speed >= map.start_y + map.height) && !(this.cord_y + y * this.speed <= map.start_y)) {
            this.cord_y += y * this.speed
        }
    }

    collWithRocks(map, move, horizontal) {
        let move_rect = {
            cord_x : this.cord_x + (horizontal ? move : 0) * this.speed,
            cord_y : this.cord_y + (!horizontal ? move : 0) * this.speed,
            box_size_x : this.box_size_x,
            box_size_y : this.box_size_y
        }
        for(let i = 0; i < map.rocks.length; i++){
            if(Functions.rectCollision(move_rect, map.rocks[i])){
                return true
            }
        }
        return false
    }
}