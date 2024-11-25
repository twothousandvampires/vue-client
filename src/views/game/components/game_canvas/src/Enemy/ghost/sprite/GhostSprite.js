import Sprite from "../../../Scr/sprite/UnitSprite";
import Unit from "../../../Scr/Unit";

export default class GhostSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 80
        this.height = 80
        this.img_name = 'ghost'
    }
    setImgState(){
        switch (this.owner.state){
            case Unit.STATE_IDLE:
                let r = Math.random() > 0.5
                if(r){
                    this.y_frame_offset = 0
                    this.max_frame = 8
                    this.frame_timer_max = 4
                }
                else {
                    this.y_frame_offset = 160
                    this.max_frame = 10
                    this.frame_timer_max = 4
                }
                break;
            case Unit.STATE_MOVE:
                this.y_frame_offset = 80
                this.max_frame = 7
                this.frame_timer_max = 3
                break;
            case Unit.STATE_CAST:
                this.y_frame_offset = 160
                this.max_frame = 10
                this.frame_timer_max = 4
                break;
            case Unit.STATE_DYING:
                this.y_frame_offset = 240
                this.max_frame = 8
                this.frame_timer_max = 2
                break;
            case Unit.STATE_RESURECT:
                this.frame = 8
                this.reversed = true
                this.y_frame_offset = 240
                this.max_frame = 7
                this.frame_timer_max = 2
                break;
            case Unit.STATE_DEAD:
                this.y_frame_offset = 320
                this.max_frame = 1
                this.frame_timer_max = 1
                break;
        }
    }
}