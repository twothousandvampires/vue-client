export default class ChainLight{

    constructor(x, y, w, h, angle) {
        this.cord_x = x
        this.cord_y = y - 40
        this.box_size_x =  (40 * w)/240
        this.box_size_y = w
        this.angle = angle
        this.frame = 0
        this.frame_timer = 0
        this.max_frame = 14
    }

    act(){
        this.frame_timer ++
        if(this.frame_timer === 1){
            this.frame_timer = 0
            this.frame ++
        }
    }
}