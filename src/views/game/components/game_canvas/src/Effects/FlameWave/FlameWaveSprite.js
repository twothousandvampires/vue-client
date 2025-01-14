import Sprite from "@/views/game/components/game_canvas/src/Scr/Sprite";

export default class FlameWaveSprite extends Sprite{
    constructor(owner) {
        super();
        this.owner = owner
        this.frame_timer_max = 2
        this.max_frame = 10
        this.img_name = 'flame_wave_effect'
        this.width = 200
        this.height = 300
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