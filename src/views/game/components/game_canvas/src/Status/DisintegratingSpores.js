import Status from "@/views/game/components/game_canvas/src/Status/Status";

export default class DisintegratingSpores extends Status{
    constructor(power, duration) {
        super();
        this.power = power
        this.duration = duration
        this.description = 'your have less evade chance and block chance after ending this effect spores will germinate'
        this.name = 'disintegrating spores'
        this.status_bar_img_name = 'disintegrating_spores_status.png'
    }

    newTurn(){
        this.duration --
        if(!this.duration){
            this.expire()
        }
    }
    affect(target){
        this.target = target
        this.target.evade -= this.power
        this.target.attack_block_chance -= this.power
    }

    expire(){
        this.target.evade += this.power
        this.target.attack_block_chance += this.power
        this.target.figth_context.pushEnemyInFreeSlot('germinated mycelium')
        this.target.status.delete(this.name)
    }

    update(status){
        this.power += status.power
        this.target.physical_damage -= status.power
        this.target.armour -= status.power
    }
}