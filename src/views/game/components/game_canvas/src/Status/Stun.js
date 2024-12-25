import StunEffect from "../Effects/Stun/StunEffect";
import Status from "@/views/game/components/game_canvas/src/Status/Status";

export default class Stun extends Status{
    constructor(duration = 1) {
        super()
        this.name = 'stunned'
        this.duration = duration
        this.description = 'you will skip your turns while you are stunned'
        this.status_bar_img_name = 'frozen.png'
        this.sprite = undefined
    }

    endTurn(){
        this.duration --
        if(!this.duration){
            this.expire()
        }
    }
    
    affect(target){
        this.target = target
        this.target.frozen = true
        this.sprite = new StunEffect(this.target.figth_context)
        this.target.figth_context.addEffect(this.sprite, target.num)
    }

    expire(){
        this.target.frozen = false
        this.target.figth_context.removeEffect(this.sprite)
        this.target.status.delete(this.name)
    }

    update(status){
        this.duration = status.duration
    }
}