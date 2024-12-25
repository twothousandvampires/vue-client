import ContentSprite from "../ContentSprite";

export default class UnknownSquad extends ContentSprite{
    constructor() {
        super();
        this.img_name = 'unknown_squad'
        this.name = 'strange shapes'
        this.frame_timer_max = 5
        this.width = 120
        this.height = 120
        this.max_frame = 28
        this.content_img_offset_x = 15
        this.content_img_offset_y = -10
        this.size_w = 75
        this.size_h = 75
    }
}