import Used from "@/views/game/components/game_canvas/src/Items/Used/Used.js";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import requestService from "@/views/game/services/requestService";

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
            data = await requestService.learnSkill(this.player.id, this.id, false)
        }
        else {
            data = await requestService.upgradeSkill(this.player.id, this.id, false)
        }

        if(data && data.success){
            this.player.parseStats(data.data)
        }
        else {
            alert(data.message)
        }
    }
}