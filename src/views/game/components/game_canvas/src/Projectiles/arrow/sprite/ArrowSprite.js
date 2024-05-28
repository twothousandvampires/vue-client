import Sprite from "../../../Scr/sprite/UnitSprite";

export default class ArrowSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 27
        this.height = 30
        this.img_name = 'arrow'
        this.frame_timer_max = 1
        this.max_frame = 10
    }

}