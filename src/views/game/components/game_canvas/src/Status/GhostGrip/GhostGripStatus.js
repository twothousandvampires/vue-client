import Functions from "../../GameFunctions";
import GhostGripSprite from "./sprite/GhostGripSprite";
import Status from "../Status";
export default class GhostGripStatus extends Status{
    constructor() {
        super()
        this.status_timer = 0
        this.name = 'ghost grip'
        this.img_path = 'src/assets/img/icons/skill/eternal_focus.png'
        this.description = '!'
        this.sprite = new GhostGripSprite(this)
        this.size_x = 100
        this.size_y = 40
        this.duration = Functions.msToTick(4000)
    }

    act(){

        this.setBottomPoint()

        let tick = this.target.fight_context.tick

        if(tick >= (this.duration) + this.affect_time){
            this.expire()
        }
        this.sprite.act()
    }

    expire(){
        this.target.reduce_movement_speed += 400
        this.target.status.delete(this.name)
    }

    affect(target){
        this.setBottomSprite(target)
        this.target = target
        this.affect_time = target.fight_context.tick
        this.target.movement_speed -= 400
    }

    update(status){
        this.affect_time = this.target.fight_context.tick
        this.duration = status.duration
    }
}