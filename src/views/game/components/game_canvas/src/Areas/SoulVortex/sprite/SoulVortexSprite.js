import Sprite from "../../../Scr/sprite/UnitSprite";

export default class SoulVortexSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.frame_timer_max = 3
        this.max_frame = 6
        this.img = new Image()
        this.img.src = './src/assets/img/effects/soul_vortex.png'
        this.width = 80
        this.height = 40
    }
}