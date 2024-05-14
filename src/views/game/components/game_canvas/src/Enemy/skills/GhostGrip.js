import Functions from "../../GameFunctions";
import GhostGripStatus from '../../Status/GhostGrip/GhostGripStatus'
export default class GhostGrip {
    constructor(owner) {
        this.owner = owner
        this.cd = false
    }

    cast(){
        let fight_context = this.owner.figth_context
        let player = fight_context.player
        player.newStatus(new GhostGripStatus(), this.owner)
        this.cd = true
        setTimeout(()=> {
            this.cd = false
        }, 10000)
    }

    canCast(){
        let fight_context = this.owner.figth_context
        let player = fight_context.player
        let distance = Functions.distance(this.owner, player)
        return distance <= this.owner.getLookingRange() && !this.cd
    }

}