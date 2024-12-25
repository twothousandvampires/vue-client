import Sprite from "../../Scr/sprite/UnitSprite";
import Unit from "../../Scr/Unit";

export default class GerminatedMyceliumSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 80
        this.height = 80
        this.img_name = 'germinated_mycelium'
    }

    setImgState(){
        switch (this.owner.state){
            case Unit.STATE_IDLE:
                this.y_frame_offset = 0
                this.max_frame = 13
                this.frame_timer_max = 2
                break;
            case Unit.STATE_DYING:
                this.y_frame_offset = 160
                this.max_frame = 8
                this.frame_timer_max = 6
                break;
            case Unit.STATE_DEAD:
                this.y_frame_offset = 240
                this.max_frame = 1
                this.frame_timer_max = 6
                break;
        }
    }

    act(){
        if(this.owner.frozen) return

        if(this.isSpriteLoopEnd()){
            this.sprite_loop_end = false
        }

        this.frame_timer ++
        if(this.frame_timer >= this.frame_timer_max) {
            this.frame_timer = 0
            this.frame ++
            if (this.frame >= this.max_frame) {
                this.frame = 0
                this.sprite_loop_end = true
                if(this.owner.state === Unit.STATE_IDLE){
                    this.y_frame_offset = 80
                    this.max_frame = 1
                    this.frame_timer_max = 200
                }
            }
        }

    }
}