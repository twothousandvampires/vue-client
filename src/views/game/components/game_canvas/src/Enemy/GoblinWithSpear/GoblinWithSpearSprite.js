import Sprite from "../../Scr/sprite/UnitSprite";
import Unit from "../../Scr/Unit";

export default class GoblinWithSpearSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 150
        this.height = 150
        this.img_name = 'goblin_with_spear'
    }
    setImgState(){
        switch (this.owner.state){
            case Unit.STATE_IDLE:
                this.y_frame_offset = 0
                this.max_frame = Math.random() < 0.5 ? 7 : 0
                this.frame_timer_max = 6
                break;
            case Unit.STATE_DYING:
                this.y_frame_offset = 150
                this.max_frame = 6
                this.frame_timer_max = 4
                break;
            case Unit.STATE_DEAD:
                this.y_frame_offset = 300
                this.max_frame = 1
                this.frame_timer_max = 4
                break;

        }
    }
}