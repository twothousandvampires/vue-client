import Functions from "../../GameFunctions";
import FearSkullProj from "../../projectiles/FearSkullProj"
export default class FearSkull{
    constructor(owner) {
        this.owner = owner
        this.cd = false
    }

    cast(fight_context){
        let player = fight_context.player
        let angle = Functions.angle(this.owner, player)
        fight_context.projectiles.push(new FearSkullProj(this.owner, angle))
        this.cd = true
        setTimeout(()=> {
            this.cd = false
        }, 6000)
    }


    canCast(fight_context){
        let player = fight_context.player
        let distance = Functions.distance(this.owner, player)
        return distance <= this.owner.getStat('looking_range') && !this.cd
    }
}