import Sprite from "../../Scr/sprite/UnitSprite";
import Unit from "../../Scr/Unit";

export default class SittingOnTheBeastSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 160
        this.height = 160
        this.img_name = 'sitting_on_the_beast'
        this.draw_y_offset = -50
    }
    setImgState(){
        switch (this.owner.state){
            case Unit.STATE_IDLE:
                this.y_frame_offset = 0
                this.max_frame = 10
                this.frame_timer_max = 6
                break;
            case Unit.STATE_DYING:
                this.y_frame_offset = 160
                this.max_frame = 7
                this.frame_timer_max = 4
                break;
            case Unit.STATE_DEAD:
                this.y_frame_offset = 320
                this.max_frame = 1
                this.frame_timer_max = 4
                break;

        }
    }
}