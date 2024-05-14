import Sprite from "../../../Scr/sprite/UnitSprite";

export default class ImmolateSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 90
        this.height = 90
        this.img = new Image()
        this.img.src = './src/assets/img/effects/immolate.png'
        this.max_frame = 8
        this.frame_timer_max  = 3
        this.frame = 0
        this.y_frame_offset = 0
    }
}