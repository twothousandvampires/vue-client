import Functions from "../../GameFunctions";
import FearSkullProj from "../../Projectiles/fear_skull_proj/FearSkullProj"
export default class FearSkull{
    constructor(owner) {
        this.owner = owner
        this.cd = false
    }

    cast(){
        let player = this.owner.fight_context.player
        let angle = Functions.angle(this.owner, player)
        this.owner.fight_context.projectiles.push(new FearSkullProj(this.owner.fight_context, this.owner.point.x, this.owner.point.y,angle,this.owner))
        this.cd = true
        setTimeout(()=> {
            this.cd = false
        }, 6000)
    }


    canCast(){
        let player = this.owner.fight_context.player

        if(player.dead || player.invisible) return false

        let distance = Functions.distance(this.owner, player)
        return distance <= this.owner.getLookingRange() && !this.cd
    }
}