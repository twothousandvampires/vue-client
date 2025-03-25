import Used from "@/views/game/components/game_canvas/src/Items/Used/Used.js";
import SummonedLivingFlesh from "@/views/game/components/game_canvas/src/Character/SummonedLivingFlesh";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";

export default class ScrollOfRaiseBones extends Used{

    constructor(template, player) {
        super(template, player)
        this.uses_in_fight = true
    }

    async use(enemy = false){

        for(let i = 0; i < 6; i++){
            let s = new SummonedLivingFlesh(this.player.fight_context, this.power, this.player.combo_points, this.player.minion_life, this.player.minion_damage)
            this.player.fight_context.pushSummon(s)
            await Functions.sleep(200)
        }

        this.afterUse()
    }

    getDescription(){
        return 'summons bones'
    }

    canUse(enemy = undefined) {
        return true
    }
}