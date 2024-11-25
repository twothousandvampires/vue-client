import Unit from "../../Scr/Unit";
import Enemy from "./Enemy";

export default class Undead extends Enemy{

    constructor(context, x, y) {
        super(context, x, y)
        this.type = 'undead'
        this.resist = 0
        this.piercing_damage_resist = 0
        this.cutting_damage_resist = 0
        this.crushing_damage_resist = 2
    }

    canResurrect(){
        return this.state === Unit.STATE_DEAD
    }

    resurrectState(){
        this.state = Unit.STATE_RESURECT
        this.resetState()
        this.stateAct = this.resurrectAct
    }

    resurrectAct(){
        if(this.sprite.isSpriteLoopEnd()){
            this.figth_context.turn_queue.push(this)
            this.dead = false
            this.life = this.max_life
            this.idleState()
        }
    }
}