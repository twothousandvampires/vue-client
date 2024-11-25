import Sprite from "@/views/game/components/game_canvas/src/Scr/Sprite";

export default class TestEffectSprite extends Sprite{
    constructor(owner) {
        super();
        this.owner = owner
        this.frame_timer_max = 1
        this.max_frame = 1
        this.img_name = 'test_effect'
        this.width = 50
        this.height = 75
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