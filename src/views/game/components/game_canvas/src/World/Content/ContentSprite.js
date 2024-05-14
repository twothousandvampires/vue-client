import Sprite from "@/views/game/components/game_canvas/src/Scr/Sprite";

export default class ContentSprite extends Sprite{
    constructor() {
        super();
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