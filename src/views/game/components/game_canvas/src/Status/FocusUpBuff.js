import Status from "@/views/game/components/game_canvas/src/Status/Status";
export default class FocusUpBuff extends Status{
    constructor(power, duration, combo = 0, evade = 0) {
        super();
        this.power = power
        this.duration = duration
        this.description = 'your speed is increased'
        this.name = 'focus up effect'
        this.status_bar_img_name = 'intuition_passive.png'
        this.combo = combo
        this.evade = evade
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
        if(this.combo){
            this.target.combo_chance += this.combo
        }
        if(this.evade){
            this.target.evade += this.evade
        }
    }

    expire(){
        this.target.speed -= this.power
        if(this.combo){
            this.target.combo_chance -= this.combo
        }
        if(this.evade){
            this.target.evade -= this.evade
        }
        this.target.status.delete(this.name)
    }

    update(status){
        if(status.power > this.power){
            this.power = status.power
        }
        this.duration = status.duration
    }
}