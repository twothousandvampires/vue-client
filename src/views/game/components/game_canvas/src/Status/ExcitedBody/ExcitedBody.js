import Functions from "../../GameFunctions";
import Status from "../Status";
export default class ExcitedBodyStatus extends Status{

    constructor(inc_attack_speed, inc_cast_speed, inc_movement_speed, duration) {
        super()
        this.name = 'excited body'
        this.img_path = 'src/assets/img/icons/skill/excited_body.png'
        this.img_name = undefined
        this.increase_attack_speed = inc_attack_speed
        this.increase_cast_speed = inc_cast_speed
        this.increase_movement_speed = inc_movement_speed
        this.duration = Functions.msToTick(duration)
    }

    act(){
        let tick = this.target.figth_context.tick
        if(tick >= this.duration + this.affect_time){
            this.expire()
        }
    }

    expire(){
        this.target['increase_attack_speed'] -= this.increase_attack_speed
        this.target['increase_cast_speed'] -= this.increase_cast_speed
        this.target['increase_movement_speed'] -= this.increase_movement_speed
        this.target.status.delete(this.name)
    }

    affect(target){
        this.target = target
        this.affect_time = target.figth_context.tick
        this.target['increase_attack_speed'] += this.increase_attack_speed
        this.target['increase_cast_speed'] += this.increase_cast_speed
        this.target['increase_movement_speed'] += this.increase_movement_speed
    }

    update(status){
        this.affect_time = this.target.figth_context.tick
        this.duration = status.duration
    }
}