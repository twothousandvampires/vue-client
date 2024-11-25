import Used from "@/views/game/components/game_canvas/src/Items/Used/Used";
import CharacterService from "@/views/game/services/CharacterService";

export default class Food extends Used{
    constructor(template, player) {
        super(template, player);
    }
    async afterUse() {
        if(Math.random() >= this.player.not_consume_food_chance / 100){
            await CharacterService.useItems([this.id], this.player)
            this.player.inv.deleteFromPull(this)
        }
    }
}