import Sprite from "../../../Scr/sprite/UnitSprite";

export default class ArrowSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 27
        this.height = 30
        this.img = new Image()
        this.img.src = './src/assets/img/projectiles/arrow.png'
        this.frame_timer_max = 1
        this.max_frame = 10
    }

}