export default class Sprite{

    constructor() {
        this.max_frame = 0
        this.frame = 0
        this.frame_timer = 0
        this.y_frame_offset = 0
        this.frame_timer_max = 0
        this.sprite_loop_end = false
        this.reversed = false
        this.src_img_url = 'http://89.111.155.67/images/'
    }

    isSpriteLoopEnd(){
        return this.sprite_loop_end
    }

    act(){
        if(this.reversed){
            if(this.sprite_loop_end){
                this.sprite_loop_end = false
            }
            this.frame_timer ++
            if(this.frame_timer >= this.frame_timer_max) {
                this.frame_timer = 0
                this.frame --
                if (this.frame === 0) {
                    this.sprite_loop_end = true
                }
            }
        }
        else {
            if(this.isSpriteLoopEnd()){
                this.sprite_loop_end = false
            }

            this.frame_timer ++
            if(this.frame_timer >= this.frame_timer_max) {
                this.frame_timer = 0
                this.frame++
                if (this.frame >= this.max_frame) {
                    this.frame = 0
                    this.sprite_loop_end = true
                }
            }
        }
    }

}