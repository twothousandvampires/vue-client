import Used from "@/views/game/components/game_canvas/src/Items/Used/Used.js";

export default class SmallHealingPotion extends Used{
    constructor(template, player) {
        super(template, player)
        this.name = 'small healing potion'
        this.uses_in_fight = true
        this.power = 10
    }

    async use(){
        await this.afterUse()
        this.player.addLife(this.getTotalPotionPower())
    }

    canUse(enemy = undefined){
        return true
    }

    getDescription(){
        return 'restores your life'
    }
}