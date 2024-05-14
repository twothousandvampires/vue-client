import Functions from "../../GameFunctions";
import Status from "../Status";
export default class Freeze extends Status{
    constructor(duration = 3000) {
        super()
        this.name = 'frozen'
        this.img_path = 'src/assets/img/icons/skill/step_of_another_world.png'
        this.duration = Functions.msToTick(duration)
    }

    act(){
        let tick = this.target.figth_context.tick
        if(tick >= (this.duration) + this.affect_time){
            this.expire()
        }
    }

    expire(){
        this.target.setUnfrozenState()
        this.target.status.delete(this.name)
    }

    affect(target){
        this.target = target
        this.target.setFrozenState()
        this.affect_time = target.figth_context.tick
    }

    update(status){
        this.affect_time = this.target.figth_context.tick
        this.duration = status.duration
    }

    targetDead() {

    }
}