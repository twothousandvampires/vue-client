import Child from "../../../Scr/Skills/Child";

export default class Overload extends Child{
    constructor(template, skill) {
        super(template, skill)
        this.img_path = 'src/assets/img/icons/skill/caster.png'
        this.ttl_value_base = -70
        this.ttl_increse_per_level = 2

        this.speed_value_per_level = 2
        this.damage_value_per_level = 5

        this.init()
    }

    init(){
        if(this.level){
            this.description = `<p>Increases speed by ${this.getSpeedValue()}%<p>
                                <p>Increases damage by ${this.getDamageValue()}%</p>
                                <p>Reduces live time by ${this.getTtlValue()}%</p>`
        }
        else {
            this.description = `<p>Increases speed<p>
                                <p>increases damage</p>
                                <p>Reduces live time</p>`
        }
    }

    getSpeedValue(){
        return this.level * this.speed_value_per_level
    }
    getTtlValue(){
        if(this.level === 1) return this.ttl_value_base
        let v = this.ttl_value_base + (this.ttl_increse_per_level * this.level)

        return v > 0 ? 0 : v
    }
    getDamageValue(){
        return this.damage_value_per_level * this.level
    }
}