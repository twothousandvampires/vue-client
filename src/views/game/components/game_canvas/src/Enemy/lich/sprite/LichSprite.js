import Sprite from "../../../Scr/sprite/UnitSprite";
import Unit from "../../../Scr/Unit";

export default class LichSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 108
        this.height = 108
        this.img_name = 'lich'
    }
    setImgState(){
        switch (this.owner.state){
            case Unit.STATE_IDLE:
                this.y_frame_offset = 0
                this.max_frame = 8
                this.frame_timer_max = 4
                break;
            case Unit.STATE_MOVE:
                this.y_frame_offset = 108
                this.max_frame = 8
                this.frame_timer_max = 2
                break;
            case Unit.STATE_CAST:
                this.y_frame_offset = 216
                this.max_frame = 15
                this.frame_timer_max = Math.floor((this.owner.getCastSpeed()/15)/50)
                break;
            case Unit.STATE_DYING:
                this.y_frame_offset = 288
                this.max_frame = 9
                this.frame_timer_max = 2
                break;
        }
    }
}