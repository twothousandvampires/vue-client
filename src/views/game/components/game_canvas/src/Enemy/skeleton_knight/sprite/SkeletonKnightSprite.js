import Sprite from "../../../Scr/sprite/UnitSprite";
import Unit from "../../../Scr/Unit";

export default class SkeletonKnightSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 96
        this.height = 96
        this.img_name = 'skeleton_knight'
    }
    setImgState(){
        switch (this.owner.state){
            case Unit.STATE_IDLE:
                this.y_frame_offset = 0
                this.max_frame = 10
                this.frame_timer_max = 6
                break;
            case Unit.STATE_MOVE:
                this.y_frame_offset = 96
                this.max_frame = 9
                this.frame_timer_max = 4
                break;
            case Unit.STATE_PURSUIT:
                this.y_frame_offset = 96
                this.max_frame = 9
                this.frame_timer_max = 4
                break;
            case Unit.STATE_ATTACK:
                this.y_frame_offset = 192
                this.max_frame = 10
                this.frame_timer_max = Math.floor((this.owner.getAttackSpeed()/10)/50)
                break;
            case Unit.STATE_DYING:
                this.y_frame_offset = 96 * 3
                this.max_frame = 7
                this.frame_timer_max = 4
                break;
            case Unit.STATE_DAMAGED:
                this.y_frame_offset =  96 * 6
                this.max_frame = 2
                this.frame_timer_max = 1
                break;
            case Unit.STATE_RESURECT:
                this.frame = 7
                this.reversed = true
                this.y_frame_offset = 96 * 3
                this.max_frame = 7
                this.frame_timer_max = 4
                break;
            case Unit.STATE_DEAD:
                if(this.owner.skull_will_spawned){
                    this.y_frame_offset = 96 * 5
                }
                else {
                    this.y_frame_offset = 96 * 4
                }

                this.max_frame = 1
                this.frame_timer_max = 4
                break;

        }
    }
}