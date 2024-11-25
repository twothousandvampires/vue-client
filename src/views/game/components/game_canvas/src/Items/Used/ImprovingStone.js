import Used from "@/views/game/components/game_canvas/src/Items/Used/Used.js";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import CharacterService from "@/views/game/services/CharacterService";

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
        let data = await CharacterService.upgradeSkill(this.player.id, option_id)
        if(data.success){
            this.player.parseStats(data.data)
            this.player.inv.deleteItem(this)
        }
    }
}