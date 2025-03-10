import Used from "@/views/game/components/game_canvas/src/Items/Used/Used.js";

export default class CombatPotion extends Used{
    constructor(template, player) {
        super(template, player)
        this.uses_in_fight = true
    }

    async use(){
        await this.afterUse()
        this.player.armour += this.getTotalPotionPower()
    }

    getDescription(){
        return 'increases your armour'
    }

    canUse(enemy = undefined){
        return true
    }
}