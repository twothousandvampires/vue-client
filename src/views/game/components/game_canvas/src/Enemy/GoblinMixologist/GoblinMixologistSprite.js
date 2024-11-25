import Sprite from "../../Scr/sprite/UnitSprite";
import Unit from "../../Scr/Unit";

export default class GoblinMixologistSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 100
        this.height = 100
        this.img_name = 'goblin_mixologist'
    }
    setImgState(){
        switch (this.owner.state){
            case Unit.STATE_IDLE:
                this.y_frame_offset = 0
                this.max_frame = 5
                this.frame_timer_max = 6
                break;
            case Unit.STATE_DYING:
                this.y_frame_offset = 100
                this.max_frame = 11
                this.frame_timer_max = 4
                break;

        }
    }
}