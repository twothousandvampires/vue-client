import ContentSprite from "../ContentSprite";

export default class ScrollContentSprite extends ContentSprite{
    constructor() {
        super();
        this.img = new Image()
        this.img.src = 'src/assets/img/world/scroll.png'
        this.frame_timer_max = 4
        this.width = 90
        this.height = 90
        this.max_frame = 10
        this.content_img_offset_x = 33
        this.content_img_offset_y = 20
        this.size_w = 30
        this.size_h = 30
    }
}