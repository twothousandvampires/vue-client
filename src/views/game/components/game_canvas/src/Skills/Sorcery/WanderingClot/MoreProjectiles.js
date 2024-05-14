import Child from "../../../Scr/Skills/Child";

export default class MoreProjectiles extends Child{
    constructor(template, skill) {
        super(template, skill)
        this.img_path = 'src/assets/img/icons/skill/destruction_impact.png'
        this.add_proj_base = 1
        this.base_damage_reduce = -60
        this.increase_damage_per_level = 3
        this.level_to_proj = 5

        this.init()
    }

    init(){
        if(!this.level){
            this.description =
            `<p>Increase projectiles count<p>
            <p>Reduce damage<p>`
        }
        else {
            this.description = `<p>Increase projectiles count by ${this.add_proj_base} and ${this.add_proj_base} per ${this.level_to_proj} levels<p>
                            <p>${this.getDamageReduce() > 0 ? 'Increase' : 'Reduce'} damage by ${this.getDamageReduce()}<p>`
        }
    }
    getDamageReduce(){
        return this.base_damage_reduce + (this.increase_damage_per_level * this.level)
    }

    getAddProj(){
        return this.add_proj_base + Math.floor(this.level/this.level_to_proj)
    }
}