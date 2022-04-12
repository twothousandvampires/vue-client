export default class WeaponSwing {

    constructor(x, y, w, h, angle) {
        this.name = 'weapon swing'
        this.cord_x = x
        this.cord_y = y
        this.box_size_x = w
        this.box_size_y = h
        this.angle = angle
        this.frame = 0
        this.frame_timer = 0
        this.max_frame = 5
    }

    act(){
        this.frame_timer ++
        if(this.frame_timer === 2){
            this.frame_timer = 0
            this.frame ++
        }
    }
}