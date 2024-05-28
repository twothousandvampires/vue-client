import ContentSprite from "../ContentSprite";

export default class CrystalVeinContentSprite extends ContentSprite{
    constructor() {
        super();
        this.img_name = 'crystal_vein'
        this.frame_timer_max = 3
        this.width = 40
        this.height = 40
        this.max_frame = 12
        this.content_img_offset_x = 30
        this.content_img_offset_y = 20
        this.size_w = 40
        this.size_h = 40
    }
}