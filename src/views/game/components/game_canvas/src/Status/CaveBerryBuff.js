import Status from "@/views/game/components/game_canvas/src/Status/Status";
export default class CaveBerryBuff extends Status{
    constructor(power, duration) {
        super();
        this.power = power
        this.duration = duration
        this.description = 'restore 1 hp every turn'
        this.name = 'cave berry effect'
        this.status_bar_img_name = 'cave_berry.png'
    }

    newTurn(){
        this.target.addLife(1)
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
        if(status.power > this.power){
            this.power = status.power
        }
        this.duration = status.duration
    }
}