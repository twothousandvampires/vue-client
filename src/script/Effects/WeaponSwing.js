import Effect from "../scr/Effect";

export default class WeaponSwing extends Effect{

    constructor(x, y, w, h, angle) {
        super(x, y, w, h, angle)
        this.img_name = 'weapon swing'
        this.max_frame = 5
        this.frame_change_tick = 2

        this.sprite_w = 100
        this.sprite_h = 100
    }

}