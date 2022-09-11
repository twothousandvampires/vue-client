export default class InnerFocus{

    constructor(template) {
        this.level = template.level
        this.name = template.name
        this.description = template.description
        this.type = template.type
        this.exp_needed = template.exp_needed
        this.order = template.order_by
    }
    affect(player){
        player.increased_armour += 10 * this.level
    }
    stopAffect(player){
        player.increased_armour -= 10 * this.level
    }
}