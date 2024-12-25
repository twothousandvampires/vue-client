import Used from "@/views/game/components/game_canvas/src/Items/Used/Used.js";

export default class SmallManaPotion extends Used{
    constructor(template, player) {
        super(template, player)
        this.uses_in_fight = true
    }

    async use(){
        await this.afterUse()
        this.player.addMana(this.getTotalPotionPower())
    }

    canUse(enemy = undefined){
        return true
    }

    getDescription(){
        return 'restores your mana'
    }
}