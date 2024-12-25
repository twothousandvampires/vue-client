import Status from "@/views/game/components/game_canvas/src/Status/Status";
export default class LustOfMurderStatus extends Status{
    constructor(power = 1) {
        super();
        this.power = power
        this.duration = 'infinity'
        this.description = 'you have additional physical damage'
        this.name = 'rage'
        this.status_bar_img_name = 'lust_of_murder_passive.png'
    }

    newTurn(){

    }
    affect(target){
        this.target = target
        this.target.physical_damage ++
        this.total_effect = 1
    }
    getDescription(){
        return `${this.name} \n${this.description} (${this.total_effect})`
    }
    expire(){
        this.target.physical_damage -= this.total_effect
        this.target.status.delete(this.name)
    }

    update(status){
        this.total_effect ++
        this.target.physical_damage ++
    }
}