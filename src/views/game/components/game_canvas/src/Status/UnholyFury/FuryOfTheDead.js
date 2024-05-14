import Functions from "../../GameFunctions";
import FuryOfTheDeadSprite from "./sprite/FuryOfTheDeadSprite";
import Status from "../Status";
export default class FuryOfTheDead extends Status{
    constructor() {
        super()
        this.name = 'Fury of the dead'
        this.sprite = new FuryOfTheDeadSprite(this)
        this.size_x = 40
        this.size_y = 40
        this.durairon = Functions.msToTick(4000)
    }

    act(){
        this.setTopPoint()

        let tick = this.target.figth_context.tick
        if(tick >= (this.durairon) + this.affect_time){
            this.expire()
        }
        this.sprite.act()
    }

    expire(){
        this.target.increased_movement_speed -= 40
        this.target.increased_cast_speed -= 40
        this.target.increased_attack_speed -= 40
        this.target.status.delete(this.name)
    }

    affect(target){
        this.setTopSprite(target)
        this.target = target
        this.affect_time = target.figth_context.tick
        this.target.increased_movement_speed += 40
        this.target.increased_cast_speed += 40
        this.target.increased_attack_speed += 40

    }

    update(status){
        this.affect_time = this.target.figth_context.tick
        this.duration = status.duration
    }
}