import ContentSprite from "../ContentSprite";

export default class PotionbrewingPost extends ContentSprite{
    constructor() {
        super();
        this.img_name = 'post_potionbrewing'
        this.name = 'potion brewing post'
        this.frame_timer_max = 10
        this.width = 150
        this.height = 150
        this.max_frame = 3
        this.content_img_offset_x = 10
        this.content_img_offset_y = -10
        this.size_w = 80
        this.size_h = 80
    }
}