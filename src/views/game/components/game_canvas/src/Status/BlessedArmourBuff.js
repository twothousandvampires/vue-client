import Status from "@/views/game/components/game_canvas/src/Status/Status";
export default class BlessedArmourBuff extends Status{
    constructor(power, duration) {
        super();
        this.power = power
        this.duration = duration
        this.description = 'your armor and resist are increased'
        this.name = 'blessed armour effect'
        this.status_bar_img_name = 'blessed_armour.gif'
    }

    newTurn(){
        this.duration --
        if(!this.duration){
            this.expire()
        }
    }
    affect(target){
        this.target = target
        this.target.armour += this.power
        this.target.resist += this.power * 3
    }

    expire(){
        this.target.armour -= this.power
        this.target.resist -= this.power * 3
        this.target.status.delete(this.name)
    }

    update(status){
        if(status.power > this.power){
            this.power = status.power
        }
        this.duration = status.duration
    }
}