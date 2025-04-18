import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import Food from "@/views/game/components/game_canvas/src/Items/Used/Food";

export default class NiceMushroom extends Food{
    constructor(template, player) {
        super(template, player)
        this.uses_in_fight = true
    }

    async use(){
        await this.afterUse()

        this.player.addLife(this.power)

        let rnd = Functions.random(4, 1)

        if(rnd === 4){
            this.player.life_leech += 1
        }
        else if(rnd === 3){
            this.player.physical_damage ++
        }
        else if(rnd === 2){
            this.player.evade ++
        }
        else{
            this.player.armour ++
        }
    }

    getDescription(){
        return 'restores your life and... something else'
    }

    canUse(enemy = undefined){
        return true
    }
}