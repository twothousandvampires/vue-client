import FireBallProj from "../../projectiles/FireBallProj";

export default class FireBall{

    constructor(template, player) {
        this.level = template.level
        this.min_dmg_per_level = 1
        this.max_dmg_per_level = 3
        this.description = template.description
        this.name = template.name
        this.img_path = template.img_path


        this.calcStats()
    }

    calcStats(){
        this.min_dmg = this.level * this.min_dmg_per_level
        this.max_dmg = this.level * this.max_dmg_per_level
    }


    getLevelProgress(){
        return `deals ${this.min_dmg} - ${this.max_dmg} damage`
    }

    levelUp(){
        this.level++
        this.calcStats()
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