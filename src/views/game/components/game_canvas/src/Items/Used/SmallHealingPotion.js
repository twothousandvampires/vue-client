import Used from "@/views/game/components/game_canvas/src/Items/Used/Used.js";
import CharacterService from "@/views/game/services/CharacterService";

export default class SmallHealingPotion extends Used{
    constructor(template, player) {
        super(template, player)
        this.name = 'small healing potion'
        this.uses_in_fight = true
    }

    async use(){
        this.player.addLife(this.power)
        await CharacterService.useItems([this.id], this.player)
        this.player.inv.deleteFromPull(this)
    }

    canUse(enemy = undefined){
        return true
    }

    getDescription(){
        return 'restores your life'
    }
}