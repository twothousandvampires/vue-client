import Status from "@/views/game/components/game_canvas/src/Status/Status";

export default class ToxicPotionStatus extends Status{
    constructor(power, duration) {
        super();
        this.power = power
        this.duration = duration
        this.description = 'you lose armour and physical damage'
        this.name = 'toxic potion'
        this.status_bar_img_name = 'toxic_potion.gif'
        this.amount = 0
    }

    newTurn(){
        this.duration --
        this.target.physical_damage --
        this.target.armour --
        this.amount ++
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