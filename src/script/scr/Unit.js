import GameObject from "./GameObject";
import Status from "./Status";
import Functions from "../GameFunctions";
import Character from "../Character/Character";
export default class Unit extends GameObject{

    constructor(x, y) {
        super(x, y);
        this.can_move = true
        this.can_attack = true
        this.can_cast = true
        this.can_action = true

        this.deal_hit = false
        this.casted = false

        this.status = new Status(this)

        this.phased = false
        this.inmaterial = false
    }


    newStatus(status, fight_context){
        let exist
        this.status.pull.forEach(elem => {
            if(elem.constructor.name == status.constructor.name){
                elem.affect_time = fight_context.tick
                exist = true
                return
            }
        })
        if(!exist){
            status.affect(fight_context)
            this.status.pull.push(status)
            if(this.owner instanceof Character){
                fight_context.newLog('you have been affected by ' + '(' + status.name + ')')

            }
        }

    }

    moreStat(stat, value){

        if( this.stats['more_' + stat] !== undefined){
            this.stats['more_' + stat] += value
        }
        else {
            this.stats['more_' + stat] = value
        }

    }
}