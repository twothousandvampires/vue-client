import Functions from "../../GameFunctions";

export default class TotemBehavior{

    constructor(unit) {
        this.unit = unit
    }

    getState(fight_context){

        if(!this.unit.action_cd){
            return 'cast'
        }
        else {
            return 'idle'
        }
    }
}