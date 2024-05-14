import Sprite from "../../../Scr/sprite/UnitSprite";

export default class FallingRocksSprite extends Sprite{
    constructor(owner) {
        super(owner)
        this.frame = Math.floor(Math.random() * 3)
        this.width = 30
        this.height = 30
        this.img = new Image()
        this.img.src = './src/assets/img/projectiles/falling_rocks.png'
        this.frame_timer_max = 1
        this.max_frame = 9
    }

    act(){

    }
}