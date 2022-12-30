import FireBallProj from "../../projectiles/FireBallProj";

export default class FireCoil {

    constructor() {
        this.level = 1
        this.description = 1
        this.name = 1
        this.img_name = 'fire_ball'
        // this.type = template.subtype;

        // this.props = template.properties
        // this.props.sort((a,b) => {
        //     return a.order - b.order
        // })
        //
        // this.chields = []
        // this.create_fire_coil_prop = this.props[0]
    }

    levelUp(){
        this.level++
    }

    use(fight_context){
        let proj = fight_context.projectiles
        let player = fight_context.player
        let a = 0
        while (a < 6.24){
            proj.push(new FireBallProj(player.cord_x, player.cord_y , a))
            a += 0.1
        }
    }

}