import ContentSprite from "../ContentSprite";

export default class GhostlyWarrior extends ContentSprite{
    constructor() {
        super();
        this.img_name = 'ghostly_warrior'
        this.name = 'ghostly warrior'
        this.frame_timer_max = 7
        this.width = 150
        this.height = 150
        this.max_frame = 8
        this.content_img_offset_x = 10
        this.content_img_offset_y = -10
        this.size_w = 80
        this.size_h = 80
    }
}