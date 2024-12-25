import Sprite from "@/views/game/components/game_canvas/src/Scr/Sprite";

export default class ShieldEffectSprite extends Sprite{
    constructor(owner) {
        super();
        this.owner = owner
        this.frame_timer_max = 1
        this.max_frame = 1
        this.img_name = 'shield_effect'
        this.width = 30
        this.height = 30
    }
    act(){
        
    }
}