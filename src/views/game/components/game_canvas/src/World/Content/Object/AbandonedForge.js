import ContentSprite from "../ContentSprite";

export default class AbandonedForge extends ContentSprite{
    constructor() {
        super();
        this.img_name = 'abandoned_forge'
        this.name = 'abandoned forge'
        this.frame_timer_max = 3
        this.width = 100
        this.height = 100
        this.max_frame = 9
        this.content_img_offset_x = 20
        this.content_img_offset_y = 0
        this.size_w = 70
        this.size_h = 70
    }
}