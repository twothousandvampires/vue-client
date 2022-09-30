export default class RoughLayer{
    constructor(template) {
        this.level = template.level
        this.name = template.name
        this.description = template.description
        this.type = template.type
        this.exp_needed = template.exp_needed
        this.order = template.order_by
        this.img_src = 'src/assets/img/icons/skill/rough_layer.png'
    }

    affect(player){
        if(player.additional_armour){
            player.additional_armour += 1 * this.level
        }
        else {
            player.additional_armour = 1 * this.level
        }
    }
    stopAffect(player){
        player.additional_armour -= 1 * this.level
    }
}