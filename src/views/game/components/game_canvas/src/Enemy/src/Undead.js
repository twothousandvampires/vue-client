import Unit from "../../Scr/Unit";
import Enemy from "./Enemy";

export default class Undead extends Enemy{

    constructor(context, x, y) {
        super(context, x, y)
        this.type = 'undead'
    }

    canResurrect(){
        return this.state === Unit.STATE_DEAD && !this.skull_will_appear
    }

    resurrectState(){
        this.state = Unit.STATE_RESURECT
        this.resetState()
        this.stateAct = this.resurrectAct
    }

    resurrectAct(){
        if(this.sprite.isSpriteLoopEnd()){
            this.skull_will_appear = Math.random() > 0.5
            this.life = this.max_life
            this.dead = false
            this.getState()
        }
    }
}