import Status from "@/views/game/components/game_canvas/src/Status/Status";

export default class Silence extends Status{
    constructor(power, duration) {
        super();
        this.power = power
        this.duration = duration
        this.description = 'you cannot use spell'
        this.name = 'silence'
        this.status_bar_img_name = 'blind_status.png'
    }

    newTurn(){
        this.duration --
        if(!this.duration){
            this.expire()
        }
    }
    affect(target){
        this.target = target
        this.target.silence = true
    }

    expire(){
        this.target.silence = false
        this.target.status.delete(this.name)
    }

    update(status){
        if(status.power > this.power){
            this.power = status.power
        }
        this.duration = status.duration
    }
}