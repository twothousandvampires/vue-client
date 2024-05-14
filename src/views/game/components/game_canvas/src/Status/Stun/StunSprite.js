import StatusSprite from "@/views/game/components/game_canvas/src/Scr/sprite/StatusSprite";
import Point from "@/views/game/components/game_canvas/src/Scr/Point";

export default class StunSprite extends StatusSprite{
    constructor() {
        super();
        this.width = 40
        this.height = 40
        this.max_frame = 10
        this.frame_timer_max = 3
        this.img = new Image()
        this.img.src = './src/assets/img/status/stun.png'
        this.point = undefined
    }

    setSize(target){
        this.size_x = target.box_size_x
        this.size_y = target.box_size_x/2
        this.point = new Point()
    }

    setPoint(target){
        this.point.x = target.point.x
        this.point.y = target.point.y - target.box_size_z + target.box_size_y/2 - this.size_y/2
    }
}