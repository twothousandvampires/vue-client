import ContentSprite from "../ContentSprite";

export default class FlyingScrolls extends ContentSprite{
    constructor() {
        super();
        this.img_name = 'flying_scrolls'
        this.name = 'flying scrolls'
        this.frame_timer_max = 4
        this.width = 100
        this.height = 100
        this.max_frame = 8
        this.content_img_offset_x = 10
        this.content_img_offset_y = 10
        this.size_w = 40
        this.size_h = 40
    }
}