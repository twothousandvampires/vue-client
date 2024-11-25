import Status from "@/views/game/components/game_canvas/src/Status/Status";
export default class FocusUpBuff extends Status{
    constructor(power, duration) {
        super();
        this.power = power
        this.duration = duration
        this.description = 'your speed is increased'
        this.name = 'focus up effect'
        this.status_bar_img_name = 'intuition_passive.png'
    }

    newTurn(){
        this.duration --
        if(!this.duration){
            this.expire()
        }
    }
    affect(target){
        this.target = target
        this.target.speed += this.power
    }

    expire(){
        this.target.speed -= this.power
        this.target.status.delete(this.name)
    }

    update(status){
        if(status.power > this.power){
            this.power = status.power
        }
        this.duration = status.duration
    }
}