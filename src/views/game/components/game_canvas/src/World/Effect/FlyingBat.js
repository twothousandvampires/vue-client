import ContentSprite from "../Content/ContentSprite";

export default class FlyingBat extends ContentSprite{
    constructor(node) {
        super();
        this.node = node
        this.img_name = 'flying_bat'
        this.frame_timer_max = 2
        this.width = 60
        this.height = 60
        this.max_frame = 12
        this.content_img_offset_x = 0
        this.content_img_offset_y = 0
        this.size_w = 60
        this.size_h = 60
        this.node.effect = this
    }

    act(){
        this.frame_timer ++
        if(this.frame_timer > this.frame_timer_max){
            this.frame_timer = 0
            this.frame ++
            if(this.frame >= this.max_frame){
                this.node.effect = null
            }
        }
    }
}