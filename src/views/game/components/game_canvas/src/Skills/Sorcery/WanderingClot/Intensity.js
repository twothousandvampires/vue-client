import Child from "../../../Scr/Skills/Child";

export default class Intensity extends Child{
    constructor(template, skill) {
        super(template, skill)
        this.img_path = 'src/assets/img/icons/skill/eternal_focus.png'
        this.increase_damage_per_level = 5
        this.reduce_damage_base = -50

        this.increase_damage_interval_per_level = 7
        this.increase_damage_interva_max = 150

        this.init()
    }

    init(){
        if(this.level){
            this.description = `<p>${this.getDamageReduce() > 0 ? 'Increases' : 'Reduces'} damage by ${this.getDamageReduce()}%<p>
                                <p>Increases damage interval by ${this.getDamageIncreaseInterval()}ms</p>`

        }
        else {
            this.description = `<p>Increases damage interval<p>
                                <p>Reduces damage</p>`
        }
    }

    getDamageReduce(){
        return this.reduce_damage_base + (this.increase_damage_per_level * this.level)
    }
    getDamageIncreaseInterval(){
        let r = this.increase_damage_interval_per_level * this.level
        if(r > this.increase_damage_interva_max){
            r = this.increase_damage_interva_max
        }
        return r
    }
}