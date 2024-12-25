import Sprite from "@/views/game/components/game_canvas/src/Scr/Sprite";

export default class MagicExplosionSprite extends Sprite{
    constructor(owner) {
        super();
        this.owner = owner
        this.frame_timer_max = 2
        this.max_frame = 7
        this.img_name = 'magic_explosion'
        this.width = 80
        this.height = 80
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