export default class Child{
    constructor(template, skill) {
        this.skill = skill
        this.id = template.id
        this.level = template.level
        this.exp_needed = template.exp_needed
        this.name = template.name
        this.max_level = template.max_level
    }

    getDescription(){
        return this.description
    }
    levelUp(){
        this.level ++
        this.init()
    }
}