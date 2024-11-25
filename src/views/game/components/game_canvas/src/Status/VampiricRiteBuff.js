import Status from "@/views/game/components/game_canvas/src/Status/Status";
export default class VampiricRiteBuff extends Status{
    constructor(power, duration) {
        super();
        this.power = power
        this.duration = duration
        this.description = 'your life leech is increased'
        this.name = 'vampiric rite effect'
        this.status_bar_img_name = 'vampiric_rite.png'
    }

    newTurn(){
        this.duration --
        if(!this.duration){
            this.expire()
        }
    }
    affect(target){
        this.target = target
        this.target.life_leech += this.power
    }

    expire(){
        this.target.life_leech -= this.power
        this.target.status.delete(this.name)
    }

    update(status){
        if(status.power > this.power){
            this.power = status.power
        }
        this.duration = status.duration
    }
}