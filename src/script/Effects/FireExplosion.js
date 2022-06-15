import Effect from "../scr/Effect";

export default class FireExplosion extends Effect{

    constructor(x, y, w, h) {
        super(x, y, w, h)
        this.img_name = 'fire explosion'
        this.max_frame = 10
        this.frame_change_tick = 2

<<<<<<< HEAD


=======
>>>>>>> f8532703bea214d8264d0a5bf1f5d78a56c56861
        this.sprite_w = 143
        this.sprite_h = 147


        this.def_w = this.sprite_w
        this.def_h = this.sprite_h

    }

}