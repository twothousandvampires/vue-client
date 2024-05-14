import Sprite from "../../../Scr/sprite/UnitSprite";

export default class IcyNovaSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.frame_timer_max = 1
        this.max_frame = 7
        this.img = new Image()
        this.img.src = './src/assets/img/effects/frost_nova.png'
        this.width = 60
        this.height = 60
    }
}