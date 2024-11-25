import Sprite from "@/views/game/components/game_canvas/src/Scr/Sprite";

export default class SwipeSprite extends Sprite{
    constructor(owner) {
        super();
        this.owner = owner
        this.frame_timer_max = 1
        this.max_frame = 10
        this.img_name = 'swipe_effect'
        this.width = 60
        this.height = 60
    }
    act(){
        this.frame_timer ++
        if(this.frame_timer === this.frame_timer_max){
            this.frame_timer = 0
            this.frame ++
            if(this.frame === this.max_frame){
                this.owner.figth_context.removeEffect(this.owner)
            }
        }
    }
}