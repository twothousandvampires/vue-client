import Sprite from "../../Scr/sprite/UnitSprite";
import Unit from "../../Scr/Unit";

export default class DeathsShardSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 200
        this.height = 200
        this.img_name = 'deaths_shard'
    }

    setImgState(){
        switch (this.owner.state){
            case Unit.STATE_IDLE:
                this.y_frame_offset = 0
                this.max_frame = 11
                this.frame_timer_max = 4
                break;
            case Unit.STATE_DYING:
                this.y_frame_offset = 200
                this.max_frame = 12
                this.frame_timer_max = 6
                break;
            case Unit.STATE_DEAD:
                this.y_frame_offset = 400
                this.frame = 0
                this.max_frame = 1
                this.frame_timer_max = 1
                break;
        }
    }
}