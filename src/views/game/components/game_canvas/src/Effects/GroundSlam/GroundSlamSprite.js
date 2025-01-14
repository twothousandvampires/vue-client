import Sprite from "@/views/game/components/game_canvas/src/Scr/Sprite";

export default class GroundSlamSprite extends Sprite{
    constructor(owner) {
        super();
        this.owner = owner
        this.frame_timer_max = 1
        this.max_frame = 18
        this.img_name = 'rocks_jump_effect'
        this.width = 40
        this.height = 40
    }
    act(){
        this.frame_timer ++
        if(this.frame_timer === this.frame_timer_max){
            this.frame_timer = 0
            this.frame ++
            if(this.frame === this.max_frame){
                this.owner.fight_context.removeEffect(this.owner)
            }
        }
    }
}