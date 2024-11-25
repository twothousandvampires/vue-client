import Status from "@/views/game/components/game_canvas/src/Status/Status";
export default class OpenWounds extends Status{
    constructor(power, duration) {
        super();
        this.power = power
        this.duration = duration
        this.description = 'you take damage every round'
        this.name = 'bleed'
        this.status_bar_img_name = 'bleed_status.gif'
    }

    newTurn(){
        this.target.takeDirectDamage(this.power)
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
        if(status.power > this.power){
            this.power = status.power
        }
        this.duration = status.duration
    }
}