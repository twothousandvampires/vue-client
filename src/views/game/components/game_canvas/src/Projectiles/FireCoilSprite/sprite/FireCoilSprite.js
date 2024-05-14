import Sprite from "../../../Scr/sprite/UnitSprite";

export default class FireCoilSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 40
        this.height = 40
        this.img = new Image()
        this.img.src = './src/assets/img/projectiles/fireball.png'
        this.frame_timer_max = 2
        this.max_frame = 8
    }

}