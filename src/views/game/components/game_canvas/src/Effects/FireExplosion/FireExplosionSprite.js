import Sprite from "../../Scr/sprite/UnitSprite";

export default class FireExplosionBigSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.frame_timer_max = 2
        this.max_frame = 11
        this.img_name = './src/assets/img/effects/explosion_fire_big.png'
        this.width = 143
        this.height = 147
    }
}