import Child from "../../../Scr/Skills/Child";

export default class EndlessEnergy extends Child{
    constructor(template, skill) {
        super(template, skill);
        this.img_path = 'src/assets/img/icons/skill/armored.png'
        this.chance = 0
        this.chance_per_level = 2

        this.init()
    }

    init(){
        if(this.level){
            this.description = `<p>Chance to create additional projectile after end ${this.getChance()}%</p>`
        }
        else {
            this.description = `<p>Give a chance to create additional projectile after end</p>`
        }
    }

    getChance(){
        return this.chance + this.chance_per_level * this.level
    }
}