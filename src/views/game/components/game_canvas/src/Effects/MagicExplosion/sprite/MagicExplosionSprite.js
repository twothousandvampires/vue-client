import Sprite from "../../../Scr/sprite/UnitSprite";

export default class MagicExplosionSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.frame_timer_max = 2
        this.max_frame = 8
        this.img = new Image()
        this.img.src = './src/assets/img/effects/magic_explosion.png'
        this.width = 80
        this.height = 80
    }
}