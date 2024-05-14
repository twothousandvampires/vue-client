import Child from "../../../Scr/Skills/Child";

export default class Explosive extends Child{
    constructor(template, skill) {
        super(template, skill);
        this.img_path = 'src/assets/img/icons/skill/excited_body.png'
        this.chance = 5
        this.chance_per_level = 10
        this.ignite_damage_base = 10
        this.ignite_damage_per_level = 5
        this.init()

    }
    init(){
        if(this.level){
            this.description = `<p>Gives chance to ignite ${this.getChance()}%
                                ignite dealing ${this.getIgniteDamage()}% of skill base damage)</p>`

        }
        else {
            this.description = `<p>Gives chance to ignite<p>
                                <p>Ignite dealing damage based of skill damage</p>`
        }
    }

    getChance(){
        let chance = this.chance + this.chance_per_level * this.level

        return chance > 100 ? 100 : chance
    }

    getIgniteDamage(){
        let damage = this.ignite_damage_base + (this.level * this.ignite_damage_per_level)

        return damage
    }
}