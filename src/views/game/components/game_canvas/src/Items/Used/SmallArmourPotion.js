import Used from "@/views/game/components/game_canvas/src/Items/Used/Used.js";
import CharacterService from "@/views/game/services/CharacterService";

export default class SmallArmourPotion extends Used{
    constructor(template, player) {
        super(template, player)
        this.img_path = '/src/assets/img/small_armour_potion.png'
        this.name = 'small armour potion'
        this.uses_in_fight = true
    }

    async use(){
        this.player.armour += this.power
        await CharacterService.useItems([this.id], this.player)
        this.player.inv.deleteFromPull(this)
    }

    getDescription(){
        return 'increases your armour'
    }

    canUse(enemy = undefined){
        return true
    }
}