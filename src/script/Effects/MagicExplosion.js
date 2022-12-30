import Effect from "../scr/Effect";

export default class MagicExplosion extends Effect{

    constructor(x, y, w = 80, h = 80) {
        super(x, y, w, h)
        this.img_name = 'magic_explosion'
        this.max_frame = 8
        this.frame_change_tick = 2

        this.sprite_w = 80
        this.sprite_h = 80
    }
}
