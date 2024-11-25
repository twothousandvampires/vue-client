import Status from "@/views/game/components/game_canvas/src/Status/Status";
export default class BreakArmour extends Status{
    constructor(power, duration) {
        super();
        this.power = power
        this.duration = duration
        this.description = 'your armor is reduced'
        this.name = 'rotten armour'
        this.status_bar_img_name = 'shield_up.png'
    }

    newTurn(){
        this.duration --
        if(!this.duration){
            this.expire()
        }
    }
    affect(target){
        this.target = target
        this.target.armour -= this.power
    }

    expire(){
        this.target.armour += this.power
        this.target.status.delete(this.name)
    }

    update(status){
        if(status.power > this.power){
            this.power = status.power
        }
        this.duration = status.duration
    }
}