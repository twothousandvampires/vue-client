import Sprite from "../../../Scr/sprite/UnitSprite";
import Unit from "../../../Scr/Unit";

export default class GiantUndeadSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 108
        this.height = 108
        this.img_name = 'giant_undead'
    }

    setImgState(){
        switch (this.owner.state){
            case Unit.STATE_IDLE:
                this.y_frame_offset = 0
                this.max_frame = 9
                this.frame_timer_max = 6
                break;
            case Unit.STATE_MOVE:
                this.y_frame_offset = 108
                this.max_frame = 8
                this.frame_timer_max = 4
                break;
            case Unit.STATE_PURSUIT:
                this.y_frame_offset = 108
                this.max_frame = 8
                this.frame_timer_max = 4
                break;
            case Unit.STATE_ATTACK:
                this.y_frame_offset = 216
                this.max_frame = 12
                this.frame_timer_max = Math.floor((this.owner.getAttackSpeed()/12)/50)
                break;
            case Unit.STATE_DYING:
                this.y_frame_offset = 324
                this.max_frame = 6
                this.frame_timer_max = 3
                break;
            case Unit.STATE_RESURECT:
                this.frame = 5
                this.reversed = true
                this.y_frame_offset = 324
                this.max_frame = 7
                this.frame_timer_max = 4
                break;
            case Unit.STATE_DEAD:
                if(this.owner.skull_will_spawned){
                    this.y_frame_offset = 540
                }
                else {
                    this.y_frame_offset = 432
                }

                this.max_frame = 1
                this.frame_timer_max = 4
                break;

        }
    }
}