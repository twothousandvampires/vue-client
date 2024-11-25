import Status from "../Status";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
export default class Ignite extends Status{
    constructor(power, duration = 1) {
        super()
        this.name = 'ignite'
        this.duration = duration
        this.power = power
        this.description = 'you take damage every turn'
        this.status_bar_img_name = 'ignite.png'
    }

    newTurn(){
        Functions.createModal(this.target, 'ignite')
        this.target.takeDirectDamage(this.power, false)
        this.duration --
        if(!this.duration){
            this.expire()
        }
    }
    affect(target){
        this.target = target
    }

    expire(){
        this.target.status.delete(this.name)
    }

    update(status){
        this.duration = status.duration
    }
}