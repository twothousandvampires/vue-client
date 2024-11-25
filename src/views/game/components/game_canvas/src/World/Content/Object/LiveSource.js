import ContentSprite from "../ContentSprite";

export default class LiveSource extends ContentSprite{
    constructor() {
        super();
        this.img_name = 'life_source'
        this.name = 'life stream'
        this.frame_timer_max = 4
        this.width = 100
        this.height = 100
        this.max_frame = 10
        this.content_img_offset_x = 10
        this.content_img_offset_y = 10
        this.size_w = 60
        this.size_h = 60
    }
}