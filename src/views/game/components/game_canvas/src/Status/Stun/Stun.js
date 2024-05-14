import Functions from "../../GameFunctions";
import Status from "../Status";
import StunSprite from "@/views/game/components/game_canvas/src/Status/Stun/StunSprite";
export default class Stun extends Status{
    constructor(duration = 3000) {
        super()
        this.name = 'stun'
        this.img_path = 'src/assets/img/icons/skill/step_of_another_world.png'
        this.duration = Functions.msToTick(duration)
        this.sprite = new StunSprite()
    }

    act(){
        let tick = this.target.figth_context.tick
        this.sprite.setPoint(this.target)
        if(tick >= (this.duration) + this.affect_time){
            this.expire()
        }
        this.sprite.act()
    }

    expire(){
        this.target.setUnstunState()
        this.target.status.delete(this.name)
    }

    affect(target){
        this.target = target
        this.target.setStunState()
        this.sprite.setSize(this.target)
        this.affect_time = target.figth_context.tick
    }

    update(status){
        this.affect_time = this.target.figth_context.tick
        this.duration = status.duration
    }

    targetDead() {

    }
}