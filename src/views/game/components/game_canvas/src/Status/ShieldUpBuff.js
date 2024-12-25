import Status from "@/views/game/components/game_canvas/src/Status/Status";
export default class ShieldUpBuff extends Status{
    constructor(power, duration) {
        super();
        this.power = power
        this.duration = duration
        this.description = 'your chance to block is increased'
        this.name = 'shield up effect'
        this.status_bar_img_name = 'shield_up_skill.png'
    }

    newTurn(){
        this.duration --
        if(!this.duration){
            this.expire()
        }
    }
    affect(target){
        this.target = target
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