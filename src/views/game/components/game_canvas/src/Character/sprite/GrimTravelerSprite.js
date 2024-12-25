import UnitSprite from "@/views/game/components/game_canvas/src/Scr/sprite/UnitSprite";
import Unit from "../../Scr/Unit";

export default class GrimTravelerSprite extends UnitSprite{
    constructor(owner) {
        super(owner);
        this.width = 96
        this.height = 96
        this.img_name = 'grim2'
        this.draw_y_offset = - 35
        this.cast_frame = 8
        this.attack_frame = 6
    }
    setImgState(){
        switch (this.owner.state){
            case Unit.STATE_IDLE :
                this.y_frame_offset = 96 * 4
                this.max_frame = 12
                this.frame_timer_max = 6
                break;
            case Unit.STATE_MOVE :
                this.y_frame_offset = 96
                this.max_frame = 8
                this.frame_timer_max = 2
                break;
            case Unit.STATE_ATTACK :
                this.y_frame_offset = 192
                this.max_frame = 10
                this.frame_timer_max = 3
                break;
            case Unit.STATE_RUN:
                this.y_frame_offset = 96
                this.max_frame = 8
                this.frame_timer_max = 1
                break;
            case Unit.STATE_BLOCK:
                this.y_frame_offset = 96 * 5
                this.max_frame = 7
                this.frame_timer_max = 6
                break;
            case Unit.STATE_WORLD_MOVE:
                this.y_frame_offset = 96
                this.max_frame = 8
                this.frame_timer_max = 1
                break;
            case Unit.STATE_WORLD_IDLE:
                this.y_frame_offset = 0
                this.max_frame = 15
                this.frame_timer_max = 4
                break;
            case Unit.STATE_DYING:
                this.y_frame_offset = 96 * 9
                this.max_frame = 10
                this.frame_timer_max = 5
                break;
            case Unit.STATE_DYSPNEA:
                this.y_frame_offset = 96 * 7
                this.max_frame = 5
                this.frame_timer_max = 5
                break;
            case Unit.STATE_DAMAGED:
                this.y_frame_offset = 96 * 6
                this.max_frame = 2
                this.frame_timer_max = 1
                break;
            case Unit.STATE_CAST:
                this.y_frame_offset = 3 * 96
                this.max_frame = 12
                this.frame_timer_max = 2
                break;
            case Unit.STATE_DEAD:
                this.y_frame_offset = 96 * 8
                this.max_frame = 6
                this.frame_timer_max = 3
                break;
            case 20:
                this.y_frame_offset = 96 * 10
                this.max_frame = 6
                this.frame_timer_max = 3
                break;
            case 21:
                this.y_frame_offset = 96 * 11
                this.max_frame = 7
                this.frame_timer_max = 4
                break;
        }
    }
}