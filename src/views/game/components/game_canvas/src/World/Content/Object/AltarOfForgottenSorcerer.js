import ContentSprite from "../ContentSprite";

export default class AltarOfForgottenSorcerer extends ContentSprite{
    constructor() {
        super();
        this.img_name = 'altar_of_forgotten_sorcerer'
        this.name = 'altar of forgotten sorcerer'
        this.frame_timer_max = 11
        this.width = 100
        this.height = 100
        this.max_frame = 11
        this.content_img_offset_x = 20
        this.content_img_offset_y = 0
        this.size_w = 70
        this.size_h = 70
    }
}