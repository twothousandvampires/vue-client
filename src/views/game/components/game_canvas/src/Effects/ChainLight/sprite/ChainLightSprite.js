import Sprite from "../../../Scr/sprite/UnitSprite";

export default class ChainLightSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.frame_timer_max = 1
        this.max_frame = 16
        this.img = new Image()
        this.img.src = './src/assets/img/effects/chain_light.png'
        this.width = 30
        this.height = 120
    }
}