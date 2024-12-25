import Status from "@/views/game/components/game_canvas/src/Status/Status";

export default class ParalyzingPoisonEffect extends Status{
    constructor(power, duration) {
        super();
        this.power = power
        this.duration = duration
        this.description = 'you lose action points and initiative'
        this.name = 'paralyzing poison'
        this.status_bar_img_name = 'poison_status.png'
    }

    newTurn(){
        this.duration --
        if(!this.duration){
            this.expire()
        }
    }
    affect(target){
        this.target = target
        this.target.reduce_action_points += 1
        this.target.initiative -= 4
    }

    expire(){
        this.target.reduce_action_points -= 1
        this.target.initiative += 4
        this.target.status.delete(this.name)
    }

    update(status){
        if(status.power > this.power){
            this.power = status.power
        }
        this.duration = status.duration
    }
}