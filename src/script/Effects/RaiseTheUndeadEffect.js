import Effect from "../scr/Effect";

export default class RaiseTheUndeadEffect extends Effect{

    constructor(x, y, w = 80, h = 80) {
        super(x, y, w, h)
        this.img_name = 'raise_the_undead'
        this.max_frame = 7
        this.frame_change_tick = 2

        this.sprite_w = 40
        this.sprite_h = 40
    }
}