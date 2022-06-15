import GameObject from "./GameObject";

export default class Effect extends GameObject{

    constructor(x, y, w, h , angle = undefined) {
        super(x, y)
        this.size_x = w
        this.size_y = h
        this.angle = angle

        this.box_size_x = w
        this.box_size_y = h/2
    }

    act(effects){
        this.frame_timer ++
        if(this.frame_timer === this.frame_change_tick){
            this.frame_timer = 0
            this.frame ++
            if(this.frame === this.max_frame){
                effects.splice(effects.indexOf(this),1)
            }
        }
    }
}