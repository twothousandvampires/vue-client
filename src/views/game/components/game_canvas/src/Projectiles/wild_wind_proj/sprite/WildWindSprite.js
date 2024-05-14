import Sprite from "../../../Scr/sprite/UnitSprite";

export default class WanderingClotSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 40
        this.height = 40
        this.img = new Image()
        this.img.src = './src/assets/img/projectiles/wandering_clot.png'
        this.frame_timer_max = 2
        this.max_frame = 10
    }

}