import ContentSprite from "../ContentSprite";

export default class LivingCreatures extends ContentSprite{
    constructor() {
        super();
        this.img_name = 'living_creatures'
        this.name = 'living creatures'
        this.frame_timer_max = 6
        this.height = 100
        this.width = 100
        this.max_frame = 12
        this.content_img_offset_x = 15
        this.content_img_offset_y = -10
        this.size_w = 75
        this.size_h = 75
    }
}