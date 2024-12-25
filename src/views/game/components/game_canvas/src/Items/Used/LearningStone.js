import Used from "@/views/game/components/game_canvas/src/Items/Used/Used.js";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import requestService from "@/views/game/services/requestService";

export default class LearningStone extends Used{
    constructor(template, player) {
        super(template, player);
        this.name = 'learning stone'
    }

    getDescription(){
        return 'offers learning one of 3 random skills'
    }

    async use(){
        let data = await requestService.getSkillsForLearning(this.char_id, this.id)
        let options = []
        data.data.forEach(elem => {
            options.push({
                'name': elem.skill_name,
                'id': elem.id,
            })
        })

        Functions.createOptionsModal(options, this, 'choose new skill')
    }

    async chooseOption(option_id){
        let data = await CharacterService.learnSkill(this.player.id, this.id, option_id)
        if(data.success){
            this.player.parseStats(data.data)
            this.player.inv.deleteItem(this)
        }
    }
}