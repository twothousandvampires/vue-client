import ContentSprite from "../Content/ContentSprite";

export default class Enter extends ContentSprite{
    constructor(node) {
        super();
        this.node = node
        this.img_name = 'enter'
        this.frame_timer_max = 300
        this.width = 100
        this.height = 100
        this.max_frame = 9
        this.content_img_offset_x = 10
        this.content_img_offset_y = - 280
        this.size_w = 75
        this.size_h = 75
        this.node.effect = this
    }

    act(){
        this.frame_timer ++
        if(this.frame_timer > this.frame_timer_max){
            this.frame_timer = 0
            this.frame ++
            if(this.frame >= this.max_frame){
                this.frame = 0
            }
        }
    }
}