import Sprite from "../../../Scr/sprite/UnitSprite";

export default class FuryOfTheDeadSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 20
        this.height = 20
        this.max_frame = 4
        this.frame_timer_max = 3
        this.img = new Image()
        this.img.src = './src/assets/img/status/fury_of_the_dead.png'
    }
}