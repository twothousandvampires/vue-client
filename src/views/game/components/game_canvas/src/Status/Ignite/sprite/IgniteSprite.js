import StatusSprite from "@/views/game/components/game_canvas/src/Scr/sprite/StatusSprite";
import Point from "@/views/game/components/game_canvas/src/Scr/Point";

export default class IgniteSprite extends StatusSprite{
    constructor() {
        super();
        this.width = 60
        this.height = 80
        this.max_frame = 5
        this.frame_timer_max = 2
        this.img = new Image()
        this.img.src = './src/assets/img/status/ignite.png'
        this.point = undefined
    }

    setSize(target){
        this.size_x = target.box_size_x
        this.size_y = target.box_size_z
        this.point = new Point(target.point.x - this.size_x/2, target.point.y - target.box_size_z + target.box_size_y/2)
    }

    setPoint(target){
        this.point.x = target.point.x
        this.point.y = target.point.y - target.box_size_y
    }
}