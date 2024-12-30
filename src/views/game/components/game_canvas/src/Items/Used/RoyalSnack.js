import Food from "@/views/game/components/game_canvas/src/Items/Used/Food";

export default class RoyalSnack extends Food{
    constructor(template, player) {
        super(template, player)
        this.uses_in_fight = true
    }

    async use(){
        await this.afterUse()
        if(this.player.combo_points < 2){
            this.player.combo_points += 1
        }
        console.log(this.player.combo_points)
        this.player.action_count ++
    }

    getDescription(){
        return 'gives combo and action point'
    }

    canUse(enemy = undefined){
        return true
    }
}