import Status from "@/views/game/components/game_canvas/src/Status/Status";

export default class CorrosiveSpores extends Status{
    constructor(power, duration) {
        super();
        this.power = power
        this.duration = duration
        this.description = 'your have less physical damage and armour after ending this effect spores will germinate'
        this.name = 'corrosive spores'
        this.status_bar_img_name = 'corrosive_spores_status.png'
    }

    newTurn(){
        this.duration --
        if(!this.duration){
            this.expire()
        }
    }
    affect(target){
        this.target = target
        this.target.physical_damage -= this.power
        this.target.armour -= this.power
    }

    expire(){
        this.target.physical_damage += this.power
        this.target.armour += this.power
        this.target.figth_context.pushEnemyInFreeSlot('germinated mycelium')
        this.target.status.delete(this.name)
    }

    update(status){
        this.power += status.power
        this.target.physical_damage -= status.power
        this.target.armour -= status.power
    }
}