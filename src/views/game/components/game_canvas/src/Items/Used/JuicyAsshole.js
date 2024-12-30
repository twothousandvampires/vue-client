import Food from "@/views/game/components/game_canvas/src/Items/Used/Food";

export default class JuicyAsshole extends Food{
    constructor(template, player) {
        super(template, player)
        this.uses_in_fight = true
    }

    async use(){
        await this.afterUse()
        this.player.addLife(this.power)
        this.player.addEnergy(10)
    }

    getDescription(){
        return 'restores your life and energy ' + this.charges
    }

    canUse(enemy = undefined){
        return true
    }
}