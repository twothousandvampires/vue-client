import Status from "@/views/game/components/game_canvas/src/Status/Status";

export default class MentalBreakingSpores extends Status{
    constructor(power, duration) {
        super();
        this.power = power
        this.duration = duration
        this.description = 'your have less resist and magic damage after ending this effect spores will germinate'
        this.name = 'mental breaking spores'
        this.status_bar_img_name = 'mental_breaking_spores_status.png'
    }

    newTurn(){
        this.duration --
        if(!this.duration){
            this.expire()
        }
    }
    affect(target){
        this.target = target
        this.target.magic_damage -= this.power
        this.target.resist -= this.power
    }

    expire(){
        this.target.magic_damage += this.power
        this.target.resist += this.power
        this.target.fight_context.pushEnemyInFreeSlot('germinated mycelium')
        this.target.status.delete(this.name)  
    }

    update(status){
        this.power += status.power
        this.target.physical_damage -= status.power
        this.target.armour -= status.power
    }
}