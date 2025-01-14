import Status from "@/views/game/components/game_canvas/src/Status/Status";
import SoulVortexEffect from "@/views/game/components/game_canvas/src/Effects/SoulVortex/SoulVortexEffect";
export default class SoulVortexStatus extends Status{
    constructor(power, duration) {
        super();
        this.power = power
        this.duration = duration
        this.description = 'you lose energy regeneration'
        this.name = 'soul vortex'
        this.status_bar_img_name = 'soul_vortex_status.png'
        this.total = 0
        this.sprite = undefined
    }

    newTurn(){
        this.target.energy_regeneration--
        this.total ++
        this.duration --
        if(!this.duration){
            this.expire()
        }
    }
    affect(target){
        this.target = target
        this.sprite = new SoulVortexEffect(this.target.fight_context)
        this.target.fight_context.addEffect(this.sprite, target.num)
    }

    expire(){
        this.target.energy_regeneration += this.total
        this.target.fight_context.removeEffect(this.sprite)
        this.target.status.delete(this.name)
    }

    update(status){
        if(status.power > this.power){
            this.power = status.power
        }
        this.duration = status.duration
    }
}