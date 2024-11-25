import Used from "@/views/game/components/game_canvas/src/Items/Used/Used.js";
import CharacterService from "@/views/game/services/CharacterService";
import SummonedLivingFlesh from "@/views/game/components/game_canvas/src/Character/SummonedLivingFlesh";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";

export default class ScrollOfRaiseBones extends Used{

    constructor(template, player) {
        super(template, player)
        this.img_path = '/src/assets/img/scroll.png'
        this.uses_in_fight = true
    }

    async use(enemy = false){

        for(let i = 0; i < 6; i++){
            let s = new SummonedLivingFlesh(this.player.figth_context, this.power)
            this.player.figth_context.pushSummon(s)
            await Functions.sleep(200)
        }

        await CharacterService.useItems([this.id], this.player)
        this.player.inv.deleteFromPull(this)
    }

    getDescription(){
        return 'summons bones'
    }

    canUse(enemy = undefined) {
        return true
    }
}