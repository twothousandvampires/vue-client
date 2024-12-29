import Used from "@/views/game/components/game_canvas/src/Items/Used/Used.js";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import requestService from "@/views/game/services/requestService";

export default class ImprovingStone extends Used{
    constructor(template, player) {
        super(template, player);
        this.name = 'improving stone'
    }

    getDescription(){
        return 'increases the level of one of your chosen skills'
    }

    async use(){
        if(!this.player.skill_pull.length){
            alert('you have no skills')
            return
        }
        let options = []
        this.player.skill_pull.forEach(elem => {
            options.push({
                'name': elem.name,
                'id': elem.id,
            })
        })

        Functions.createOptionsModal(options, this,  'choose skill to level up')
    }

    async chooseOption(option_id){
        let res = await requestService.serverRequest('upgrade_skill', { used_id: this.id, skill_id: option_id })
        if(res.success){
            this.player.parseStats(res.data.char)
            this.player.inv.deleteItem(this)
        }
        else{
            alert(res.message)
        }
    }
}