import Sprite from "@/views/game/components/game_canvas/src/Scr/Sprite";

export default class FireExplosionBigSprite extends Sprite{
    constructor(owner) {
        super();
        this.owner = owner
        this.frame_timer_max = 2
        this.max_frame = 11
        this.img_name = 'fire_explosion_effect'
        this.width = 143
        this.height = 147
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