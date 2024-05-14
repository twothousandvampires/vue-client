import Functions from "../../GameFunctions";
import FearSprite from "./sprite/FearSprite";
import Status from "../Status";

export default class Fear extends Status{
    constructor() {
        super()
        this.name = 'fear'
        this.img_path = 'src/assets/img/icons/skill/step_of_another_world.png'
        this.sprite = new FearSprite(this)
        this.size_x = 40
        this.size_y = 40
        this.duration = Functions.msToTick(3000)
    }

    act(){

        this.setTopPoint()

        let tick = this.target.figth_context.tick
        if(tick >= (this.duration) + this.affect_time){
            this.expire()
        }

        this.sprite.act()
    }

    expire(){
        this.target.feared = false
        this.target.direction_angle = false
        this.target.status.delete(this.name)
    }

    affect(target, source){
        if(target.direction_angle){
            target.status.delete(this.name)
            return
        }
        this.setTopSprite(target)
        this.target = target
        this.affect_time = target.figth_context.tick
        this.target.direction_angle = Functions.angle(source, target)
        target.setMove()
        this.target.feared = true
    }

    update(status){
        this.affect_time = this.target.figth_context.tick
        this.duration = status.duration
    }

    targetDead() {
        this.expire()
    }
}