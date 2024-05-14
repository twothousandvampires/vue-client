import Sprite from "../../../Scr/sprite/UnitSprite";

export default class ShatterSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 108
        this.height = 108
        this.real_x = 77
        this.max_frame = 1
        this.frame_timer_max = 1
        this.img = new Image()
        this.img.src = './src/assets/img/status/freeze.png'
    }
}