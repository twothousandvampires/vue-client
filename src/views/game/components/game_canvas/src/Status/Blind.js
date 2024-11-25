import Status from "@/views/game/components/game_canvas/src/Status/Status";

export default class Blind extends Status{
    constructor(power, duration) {
        super();
        this.power = power
        this.duration = duration
        this.description = 'you can miss the attack'
        this.name = 'blind'
        this.status_bar_img_name = 'blind_status.png'
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
        this.target.blind += 20
    }

    expire(){
        this.target.blind -= 20
        this.target.status.delete(this.name)
    }

    update(status){
        if(status.power > this.power){
            this.power = status.power
        }
        this.duration = status.duration
    }
}