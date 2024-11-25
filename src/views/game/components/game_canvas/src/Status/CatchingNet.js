import Status from "@/views/game/components/game_canvas/src/Status/Status";
export default class CatchingNet extends Status{
    constructor(power, duration) {
        super();
        this.power = power
        this.duration = duration
        this.description = 'your speed is reduced'
        this.name = 'catching net'
        this.status_bar_img_name = 'catching_net.png'
    }

    newTurn(){
        this.duration --
        if(!this.duration){
            this.expire()
        }
    }
    affect(target){
        this.target = target
        this.target.speed -= this.power
    }

    expire(){
        this.target.speed += this.power
        this.target.status.delete(this.name)
    }

    update(status){
        this.target.speed += this.power
        this.power += status.power
        this.target.speed -= this.power
        this.duration = status.duration
    }
}