import Status from "@/views/game/components/game_canvas/src/Status/Status";

export default class ChokingSpores extends Status{
    constructor(power, duration) {
        super();
        this.power = power
        this.duration = duration
        this.description = 'you take damage every round'
        this.name = 'choking spores'
        this.status_bar_img_name = 'choking_spores_status.png'
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
        this.power ++
        this.duration = status.duration
    }
}