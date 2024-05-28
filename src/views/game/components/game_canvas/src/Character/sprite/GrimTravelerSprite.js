import UnitSprite from "@/views/game/components/game_canvas/src/Scr/sprite/UnitSprite";
import Unit from "../../Scr/Unit";

export default class GrimTravelerSprite extends UnitSprite{
    constructor(owner) {
        super(owner);
        this.width = 96
        this.height = 96
        this.img = new Image()
        this.img.src = this.src_img_url + 'grim.png'
    }
    setImgState(){
        switch (this.owner.state){
            case Unit.STATE_IDLE :
                this.y_frame_offset = 0
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
                this.frame_timer_max = Math.floor((this.owner.getAttackSpeed() / 10)/ 40)
                break;
            case Unit.STATE_RUN:
                this.y_frame_offset = 96
                this.max_frame = 8
                this.frame_timer_max = 1
                break;
            case Unit.STATE_BLOCK:
                this.y_frame_offset = 480
                this.max_frame = 4
                this.frame_timer_max = 6
                break;
            case Unit.STATE_WORLD_MOVE:
                this.y_frame_offset = 384
                this.max_frame = 8
                this.frame_timer_max = 1
                break;
            case Unit.STATE_WORLD_IDLE:
                this.y_frame_offset = 288
                this.max_frame = 16
                this.frame_timer_max = 4
                break;
            case Unit.STATE_DYING:
                this.y_frame_offset = 96 * 9
                this.max_frame = 11
                this.frame_timer_max = 5
                break;
            case Unit.STATE_DYSPNEA:
                this.y_frame_offset = 96 * 8
                this.max_frame = 4
                this.frame_timer_max = 5
                break;
            case Unit.STATE_DAMAGED:
                this.y_frame_offset = 96 * 7
                this.max_frame = 2
                this.frame_timer_max = 1
                break;
            case Unit.STATE_CAST:
                this.y_frame_offset = 6 * 96
                this.max_frame = 11
                this.frame_timer_max = Math.floor((this.owner.getCastSpeed() / 10) / 50)
                break;
            case Unit.STATE_DEAD:
                this.y_frame_offset = 96 * 10
                this.max_frame = 9
                this.frame_timer_max = 3
                break;

        }
    }
}