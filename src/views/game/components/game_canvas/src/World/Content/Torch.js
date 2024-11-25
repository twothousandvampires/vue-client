import ContentSprite from "./ContentSprite";

export default class Torch extends ContentSprite{
    constructor() {
        super();
        this.img_name = 'torch'
        this.name = 'lighted torch'
        this.frame_timer_max = 6
        this.width = 60
        this.height = 60
        this.max_frame = 5
        this.content_img_offset_x = 16
        this.content_img_offset_y = 0
        this.size_w = 60
        this.size_h = 60
    }
}