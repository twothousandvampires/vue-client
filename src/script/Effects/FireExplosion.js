import Effect from "../scr/Effect";

export default class FireExplosion extends Effect{

    constructor(x, y, w, h) {
        super(x, y, w, h)
        this.img_name = 'fire explosion'
        this.max_frame = 10
        this.frame_change_tick = 2



        this.sprite_w = 143
        this.sprite_h = 147


        this.def_w = this.sprite_w
        this.def_h = this.sprite_h

    }

}