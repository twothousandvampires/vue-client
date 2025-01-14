import Functions from "../../GameFunctions";

export default class Teleport {
    constructor(owner) {
        this.owner = owner
        this.cd = false
    }

    cast(){
        let fight_context = this.owner.fight_context
        let player = fight_context.player
        let teleport_x = player.point.x < 650 ? Math.floor(Math.random() * (850 - 650) + 650) : Math.floor(Math.random() * (650 - 200) + 200)
        let teleport_y = player.point.y < 850 ? Math.floor(Math.random() * (1050 - 850) + 850) : Math.floor(Math.random() * (850 - 400) + 400)

        this.owner.point.x = 9999
        this.owner.point.y = 6666

        setTimeout(()=> {
            this.owner.point.x = teleport_x
            this.owner.point.y = teleport_y
        }, 1000)
        this.cd = true
        setTimeout(()=> {
            this.cd = false
        }, 15000)
    }

    canCast(){
        let fight_context = this.owner.fight_context
        let player = fight_context.player
        let distance = Functions.distance(this.owner, player)
        return distance <= 100 && !this.cd
    }
}