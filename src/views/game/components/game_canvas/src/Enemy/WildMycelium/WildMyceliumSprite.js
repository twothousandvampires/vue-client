import Sprite from "../../Scr/sprite/UnitSprite";
import Unit from "../../Scr/Unit";

export default class WildMyceliumSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 120
        this.height = 120
        this.img_name = 'wild_mycelium'
    }

    setImgState(){
        switch (this.owner.state){
            case Unit.STATE_IDLE:
                this.y_frame_offset = 0
                this.max_frame = 21
                this.frame_timer_max = 4
                break;
            case Unit.STATE_DYING:
                this.y_frame_offset = 100
                this.max_frame = 11
                this.frame_timer_max = 2
                break;
            case Unit.STATE_DEAD:
                this.y_frame_offset = 200
                this.max_frame = 13
                this.frame_timer_max = 6
        }
    }
}