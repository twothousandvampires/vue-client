import Sprite from "../../../Scr/sprite/UnitSprite";

export default class WanderingClotEndSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.frame_timer_max = 2
        this.max_frame = 7
        this.img = new Image()
        this.img.src = './src/assets/img/effects/wandering_clot_end.png'
        this.width = 40
        this.height = 40
    }
}