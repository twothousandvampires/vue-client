import Sprite from "../../../Scr/sprite/UnitSprite";
import Unit from "../../../Scr/Unit";

export default class SkeletonWarriorSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 100
        this.height = 100
        this.img_name = 'skeleton'
        this.end_attack_frame = 9
    }

    isLastAttackFrame(){
        return this.frame === this.end_attack_frame
    }

    setImgState(){
        switch (this.owner.state){
            case Unit.STATE_IDLE:
                this.y_frame_offset = 0
                this.max_frame = Math.random() < 0.5 ? 8 : 0
                this.frame_timer_max = 6
                break;
            case Unit.STATE_MOVE:
                this.y_frame_offset = 100
                this.max_frame = 8
                this.frame_timer_max = 4
                break;
            case Unit.STATE_PURSUIT:
                this.y_frame_offset = 100
                this.max_frame = 8
                this.frame_timer_max = 4
                break;
            case Unit.STATE_ATTACK:
                this.y_frame_offset = 100
                this.max_frame = 10
                this.frame_timer_max = 3
                break;
            case Unit.STATE_DYING:
                if(this.owner.frozen){
                    this.y_frame_offset = 400
                    this.max_frame = 9
                    this.frame_timer_max = 4
                }
                else if(this.owner.dead_by_ignite){
                    this.y_frame_offset = 500
                    this.max_frame = 9
                    this.frame_timer_max = 4
                }
                else {
                    this.y_frame_offset = 300
                    this.max_frame = 10
                    this.frame_timer_max = 2
                }
                break;
            case Unit.STATE_RESURECT:
                this.frame = 6
                this.reversed = true
                this.y_frame_offset = 288
                this.max_frame = 7
                this.frame_timer_max = 4
                break;
            case Unit.STATE_DEAD:
                if(this.owner.skull_will_spawned){
                    this.y_frame_offset = 600
                }
                else {
                    this.y_frame_offset = 600
                }
                this.frame = 0
                this.max_frame = 1
                this.frame_timer_max = 1
                break;
            case Unit.STATE_DAMAGED:
                this.y_frame_offset = 200
                this.max_frame = 9
                this.frame_timer_max = 1
                break;
            case Unit.STATE_FROZEN:
                this.y_frame_offset = 400
                this.max_frame = 1
                this.frame_timer_max = 1
                break;
            case Unit.STATE_STUNNED:
                this.y_frame_offset = 576
                this.max_frame = 1
                this.frame_timer_max = 1
                break;
        }
    }
}