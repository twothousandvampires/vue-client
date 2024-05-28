import Status from "@/views/game/components/game_canvas/src/Status/Status";

export default class ShieldUp extends Status{
    constructor(power = 10, duration = 3) {
        super();
        this.name = 'Shield up!'
        this.duration = duration
        this.status_bar_img_name = 'shield_up.png'
        this.power = power
    }
    newTurn(){
        this.duration --
        if(!this.duration){
            this.expire()
        }
    }
    affect(target){
        this.target = target
        this.affect_time = target.figth_context.tick
        this.target.attack_block += this.power
    }

    expire(){
        this.target.attack_block -= this.power
        this.target.status.delete(this.name)
    }

    update(status){
        if(status.power > this.power){
            this.power = status.power
        }
        this.duration = status.duration
    }
}