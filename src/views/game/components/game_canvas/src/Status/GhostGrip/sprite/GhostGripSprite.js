import Sprite from "../../../Scr/sprite/UnitSprite";

export default class GhostGripSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 100
        this.height = 40
        this.max_frame = 9
        this.frame_timer_max = 3
        this.img = new Image()
        this.img.src = './src/assets/img/status/ghost_grip.png'
    }
}