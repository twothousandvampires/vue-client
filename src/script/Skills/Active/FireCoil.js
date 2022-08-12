import FireBallProj from "../../projectiles/FireBallProj";

export default class FireCoil {

    constructor(template) {
        this.level = template.level
        this.description = template.description
        this.name = template.name
        this.img_path = template.img_path
        this.type = template.subtype;

        this.props = template.properties
        this.props.sort((a,b) => {
            return a.order - b.order
        })

        this.chields = []
        this.create_fire_coil_prop = this.props[0]
    }

    levelUp(){
        this.level++
    }

    use(proj, angle, x ,y){
        let a = 0
        while (a < 6.24){
            proj.push(new FireBallProj(x, y , a))
            a += 0.1
        }
        proj.push(new FireBallProj(x, y , angle))
    }

}