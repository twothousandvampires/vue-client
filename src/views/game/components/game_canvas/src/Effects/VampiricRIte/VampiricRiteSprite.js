import Sprite from "@/views/game/components/game_canvas/src/Scr/Sprite";

export default class VampiricRiteSprite extends Sprite{
    constructor(owner) {
        super();
        this.owner = owner
        this.frame_timer_max = 1
        this.max_frame = 14
        this.img_name = 'vampiric_rite_effect'
        this.width = 400
        this.height = 400
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