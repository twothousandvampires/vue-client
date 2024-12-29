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
        let res = await requestService.serverRequest('get_item_skills', {item_id: this.id })
        if(res.success){
            let options = []
            res.data.skills.forEach(elem => {
                options.push({
                    'name': elem.skill_name,
                    'id': elem.id,
                })
            })
    
            Functions.createOptionsModal(options, this, 'choose new skill')
        }
    }

    async chooseOption(option_id){
        let res = await requestService.serverRequest('learn_skill', { used_id: this.id, skill_id: option_id })
        if(res.success){
            this.player.parseStats(res.data.char)
            // this.player.inv.deleteItem(this)
        }
    }
}