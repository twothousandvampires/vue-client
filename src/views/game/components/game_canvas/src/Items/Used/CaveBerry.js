import Food from "@/views/game/components/game_canvas/src/Items/Used/Food";
import CaveBerryBuff from "@/views/game/components/game_canvas/src/Status/CaveBerryBuff";

export default class CaveBerry extends Food{
    constructor(template, player) {
        super(template, player)
        this.img_path = '/src/assets/img/cave_berry.png'
        this.name = 'cave berry'
        this.uses_in_fight = true
    }

    async use(){
        await this.afterUse()
        this.player.resist += this.power
        this.player.newStatus(new CaveBerryBuff(this.power, 5), this.player, true)
    }

    getDescription(){
        return 'increases your resist and gives life regeneration'
    }
    canUse(enemy = undefined){
        return true
    }
}