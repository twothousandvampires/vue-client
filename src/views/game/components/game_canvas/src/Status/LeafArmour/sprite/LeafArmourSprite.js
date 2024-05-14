import Sprite from "@/views/game/components/game_canvas/src/Scr/Sprite";

export default class LeafArmourSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 20
        this.height = 20
        this.max_frame = 4
        this.frame_timer_max = 3
        this.img = new Image()
        this.img.src = './src/assets/img/status/leaf_armour.png'
    }
}