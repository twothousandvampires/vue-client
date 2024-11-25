import ContentSprite from "../Content/ContentSprite";

export default class WildLight extends ContentSprite{
    constructor(node, map) {
        super();
        this.node = node
        this.node.light = true
        this.img_name = 'wild_light'
        this.frame_timer_max = 1
        this.width = 60
        this.height = 60
        this.max_frame = 21
        this.content_img_offset_x = 30
        this.content_img_offset_y = 0
        this.size_w = 40
        this.size_h = 40
        this.node.effect = this
        this.node.setMist(map)
    }

    act(){
        this.frame_timer ++
        if(this.frame_timer > this.frame_timer_max){
            this.frame_timer = 0
            this.frame ++
            if(this.frame >= this.max_frame){
                this.node.light = false
                this.node.effect = null
                this.node.mist_offsets = []
            }
        }
    }
}