import ContentSprite from "../ContentSprite";

export default class ChestContentSprite extends ContentSprite{
    constructor() {
        super();
        this.img = new Image()
        this.img.src = 'src/assets/img/world/treasure.png'
        this.frame_timer_max = 3
        this.width = 90
        this.height = 90
        this.max_frame = 11
        this.content_img_offset_x = 10
        this.content_img_offset_y = 0
        this.size_w = 60
        this.size_h = 60
    }
}