export default class Sprite{

    constructor() {
        this.max_frame = 0
        this.frame = 0
        this.frame_timer = 0
        this.y_frame_offset = 0
        this.frame_timer_max = 0
        this.sprite_loop_end = false
        this.draw_y_offset = 0
    }

    isSpriteLoopEnd(){
        return this.sprite_loop_end
    }

    act(){
        if(this.owner.frozen) return

        if(this.isSpriteLoopEnd()){
            this.sprite_loop_end = false
        }

        this.frame_timer ++
        if(this.frame_timer >= this.frame_timer_max) {
            this.frame_timer = 0
            this.frame ++
            if (this.frame >= this.max_frame) {
                this.frame = 0
                this.sprite_loop_end = true
            }
        }

    }

}