import ContentSprite from "../ContentSprite";

export default class ChestContentSprite extends ContentSprite{
    constructor() {
        super();
        this.img_name = 'treasure'
        this.name = 'treasure'
        this.frame_timer_max = 3
        this.width = 90
        this.height = 90
        this.max_frame = 11
        this.content_img_offset_x = 29
        this.content_img_offset_y = 8
        this.size_w = 50
        this.size_h = 50
    }
}