import ContentSprite from "../ContentSprite";

export default class GreenskinsSprite extends ContentSprite{
    constructor() {
        super();
        this.img_name = 'greenskins_squad'
        this.name = 'green skins'
        this.frame_timer_max = 8
        this.width = 150
        this.height = 150
        this.max_frame = 11
        this.content_img_offset_x = 15
        this.content_img_offset_y = -10
        this.size_w = 75
        this.size_h = 75
    }
}