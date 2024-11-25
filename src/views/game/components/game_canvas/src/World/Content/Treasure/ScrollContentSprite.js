import ContentSprite from "../ContentSprite";

export default class ScrollContentSprite extends ContentSprite{
    constructor() {
        super();
        this.img_name  = 'dead_body'
        this.name  = 'dead body'
        this.frame_timer_max = 5
        this.width = 200
        this.height = 200
        this.max_frame = 5
        this.content_img_offset_x = 20
        this.content_img_offset_y = 10
        this.size_w = 60
        this.size_h = 60
    }
}