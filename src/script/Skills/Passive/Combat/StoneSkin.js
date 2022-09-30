export default class StoneSkin{
    constructor(template) {
        this.level = template.level
        this.name = template.name
        this.description = template.description
        this.type = template.type
        this.exp_needed = template.exp_needed
        this.order = template.order_by
        this.img_src = 'src/assets/img/icons/skill/stone_skin.png'
    }

    affect(player){
        if(player.increased_armour){
            player.increased_armour += 10 * this.level
        }
        else {
            player.increased_armour = 10 * this.level
        }

        player.createStats()
    }
    stopAffect(player){
        player.increased_armour -= 10 * this.level
        player.createStats()
    }
}