import ContentSprite from "../ContentSprite";

export default class RemainsOfCamp extends ContentSprite{
    constructor() {
        super()
        this.img_name = 'remains_of_camp'
        this.name = 'remains of the camp'
        this.frame_timer_max = 4
        this.width = 100
        this.height = 100
        this.max_frame = 10
        this.content_img_offset_x = 20
        this.content_img_offset_y = 20
        this.size_w = 50
        this.size_h = 50
    }
}