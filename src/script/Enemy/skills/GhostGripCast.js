import Functions from "../../GameFunctions";
import GhostGrip from '../../status/GhostGrip'
export default class GhostGripCast {
    constructor(owner) {
        this.owner = owner
        this.cd = false
    }

    cast(fight_context){
        let player = fight_context.player
        player.newStatus(new GhostGrip(player), fight_context)
        this.cd = true
        setTimeout(()=> {
            this.cd = false
        }, 60000)
    }

    canCast(fight_context){
        let player = fight_context.player
        let distance = Functions.distance(this.owner, player)
        return distance <= this.owner.getStat('looking_range') && !this.cd
    }

}