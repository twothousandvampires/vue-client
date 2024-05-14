import SoulVortexArea from "../../Areas/SoulVortex/SoulVortexArea";
import Functions from "../../GameFunctions";

export default class SoulVortex {
    constructor(owner) {
        this.owner = owner
        this.cd = false
    }

    cast(){
        let fight_context = this.owner.figth_context
        let player = fight_context.player
        fight_context.areas_before.push(new SoulVortexArea(fight_context,player.point.x, player.point.y, 120, 60, fight_context.tick))
        this.cd = true
        setTimeout(()=> {
            this.cd = false
        }, 1000)
    }

    canCast(){
        let fight_context = this.owner.figth_context
        let player = fight_context.player
        let distance = Functions.distance(this.owner, player)
        return distance <= this.owner.getLookingRange() && !this.cd
    }
}