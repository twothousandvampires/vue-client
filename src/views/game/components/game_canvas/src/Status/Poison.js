import Status from "@/views/game/components/game_canvas/src/Status/Status";

export default class Poison extends Status{
    constructor(power, duration) {
        super();
        this.power = power
        this.duration = duration
        this.description = 'you take damage every turn'
        this.name = 'poison'
        this.status_bar_img_name = 'poison_status.png'
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