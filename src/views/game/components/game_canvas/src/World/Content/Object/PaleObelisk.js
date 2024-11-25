import ContentSprite from "../ContentSprite";

export default class PaleObelisk extends ContentSprite{
    constructor() {
        super();
        this.img_name = 'pale_obelisk'
        this.name = 'pale obelisk'
        this.frame_timer_max = 8
        this.width = 150
        this.height = 150
        this.max_frame = 3
        this.content_img_offset_x = 10
        this.content_img_offset_y = - 10
        this.size_w = 80
        this.size_h = 80
    }
}