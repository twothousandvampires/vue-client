import Sprite from "@/views/game/components/game_canvas/src/Scr/Sprite";

export default class SoulVortexSprite extends Sprite{
    constructor(owner) {
        super();
        this.owner = owner
        this.frame_timer_max = 5
        this.max_frame = 5
        this.img_name = 'soul_vortex'
        this.width = 80
        this.height = 40
    }
    act(){
        this.frame_timer ++
        if(this.frame_timer === this.frame_timer_max){
            this.frame_timer = 0
            this.frame ++
            if(this.frame === this.max_frame){
                this.frame = 0
            }
        }
    }
}