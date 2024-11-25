import Used from "@/views/game/components/game_canvas/src/Items/Used/Used.js";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import CharacterService from "@/views/game/services/CharacterService";

export default class UnpredictableStone extends Used{
    constructor(template, player) {
        super(template, player);
        this.name = 'unpredictable stone'
    }

    getDescription(){
        return 'randomly increases the level of one of your skills or you gain a random skill'
    }

    async use(){
        let options = [
            {
                'name': 'get random skill',
                'id': 1
            },
            {
                'name': 'improve random skill',
                'id': 2
            }
        ]

        Functions.createOptionsModal(options, this, 'choose one')
    }

    async chooseOption(option_id){
        let data = undefined
        if(option_id === 1){
            data = await CharacterService.learnSkill(this.player.id, false)
        }
        else {
            data = await CharacterService.upgradeSkill(this.player.id, false)
        }

        if(data && data.success){
            this.player.parseStats(data.data)
            this.player.inv.deleteItem(this)
        }
        else {
            alert(data.message)
        }
    }
}