import ContentSprite from "../ContentSprite";

export default class EnvironmentSprite extends ContentSprite{
    constructor() {
        super();
        this.img_name = 'environment_squad'
        this.name = 'environment'
        this.frame_timer_max = 4
        this.width = 100
        this.height = 100
        this.max_frame = 18
        this.content_img_offset_x = 15
        this.content_img_offset_y = -10
        this.size_w = 75
        this.size_h = 75
    }
}