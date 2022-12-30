import Effect from "../scr/Effect";

export default class ChainLight extends Effect{

    constructor(x, y, w, h = 0, angle)  {
        console.log('a', angle)
        super(x, y, w, h , angle)
        this.size_x =  (40 * w)/240
        this.size_y = w

        this.box_size_x =  (40 * w)/240
        this.box_size_y = w

        this.angle = angle
        this.frame = 0
        this.frame_timer = 0
        this.max_frame = 16
        this.img_name = 'chain light'
        this.frame_change_tick = 1

        this.sprite_w = 30
        this.sprite_h = 120

    }

}