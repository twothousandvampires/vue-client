import SoulVortex from "../../Areas/SoulVortex";
import Functions from "../../GameFunctions";

export default class SoulVortexCast {
    constructor(owner) {
        this.owner = owner
        this.cd = false
    }

    cast(fight_context){
        let player = fight_context.player
        fight_context.areas_before.push(new SoulVortex(player.cord_x, player.cord_y, 120, 60, fight_context.tick))
        this.cd = true
        setTimeout(()=> {
            this.cd = false
        }, 10000)
    }

    canCast(fight_context){

        let player = fight_context.player
        let distance = Functions.distance(this.owner, player)
        return distance <= 200 && !this.cd
    }
}