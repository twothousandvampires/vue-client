import ContentSprite from "../ContentSprite";

export default class OuterLife extends ContentSprite{
    constructor() {
        super();
        this.img_name = 'outer_life'
        this.name = 'outer life'
        this.frame_timer_max = 7
        this.width = 150
        this.height = 150
        this.max_frame = 7
        this.content_img_offset_x = 29
        this.content_img_offset_y = 8
        this.size_w = 60
        this.size_h = 60
    }
}