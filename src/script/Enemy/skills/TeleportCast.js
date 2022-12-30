import SoulVortex from "../../Areas/SoulVortex";
import Functions from "../../GameFunctions";

export default class TeleportCast{
    constructor(owner) {
        this.owner = owner
        this.cd = false
    }

    cast(fight_context){
        let player = fight_context.player
        let teleport_x = player.cord_x < 650 ? Math.floor(Math.random() * (850 - 650) + 650) : Math.floor(Math.random() * (650 - 200) + 200)
        let teleport_y = player.cord_y < 850 ? Math.floor(Math.random() * (1050 - 850) + 850) : Math.floor(Math.random() * (850 - 400) + 400)

        this.owner.cord_x = 9999
        this.owner.cord_y = 6666

        setTimeout(()=> {
            this.owner.cord_x = teleport_x
            this.owner.cord_y = teleport_y
        }, 1000)
        this.cd = true
        setTimeout(()=> {
            this.cd = false
        }, 15000)
    }

    canCast(fight_context){
        let player = fight_context.player
        let distance = Functions.distance(this.owner, player)
        return distance <= 100 && !this.cd
    }
}