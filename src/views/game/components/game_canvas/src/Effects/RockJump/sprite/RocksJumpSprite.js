import Sprite from "../../../Scr/sprite/UnitSprite";

export default class RocksJumpSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.frame_timer_max = 2
        this.max_frame = 19
        this.img = new Image()
        this.img.src = './src/assets/img/effects/rocks_jump.png'
        this.width = 40
        this.height = 40
    }
}