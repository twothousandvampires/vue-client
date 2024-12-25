import Status from "@/views/game/components/game_canvas/src/Status/Status";
import LuminousArcEffect from "../Effects/ChainLight/ChainLight";
import Functions from "../GameFunctions";
import Point from "../Scr/Point";
export default class BoltedLigthningShield extends Status{
    constructor(power, duration) {
        super();
        this.power = power
        this.duration = duration
        this.description = 'when you get an attack damage there is a chance to struct enemy by lightning'
        this.name = 'lightning shield'
        this.status_bar_img_name = 'lightning_shield_status.gif'
    }

    newTurn(){
        this.duration --
        if(!this.duration){
            this.expire()
        }
    }
    affect(target){
        this.target = target
        this.target.whenAttackHitTriggers.push(this)
    }

    expire(){
        this.target.whenAttackHitTriggers = this.target.whenAttackHitTriggers.filter(elem => elem != this)
        this.target.status.delete(this.name)
    }

    update(status){
        this.duration = status.duration
    }

    trigger(enemy){
        if(Math.random() >= 0.7){
            let t = enemy
        
            let l_effect = new LuminousArcEffect(this.target.figth_context, Functions.angle(t, this.target), Functions.distance(this.target, t))
    
            l_effect.point = new Point((this.target.point.x + t.point.x) / 2, (this.target.point.y + t.point.y) / 2)
    
            this.target.figth_context.addEffect(l_effect)
    
            let d = {
                lightning_damage: this.power,
            }
    
           t.takeSpellDamage(this.target, d)
        }
    }
}