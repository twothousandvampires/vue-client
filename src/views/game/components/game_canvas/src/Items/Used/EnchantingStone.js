import Used from "@/views/game/components/game_canvas/src/Items/Used/Used.js";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import CharacterService from "@/views/game/services/CharacterService";

export default class EnchantingStone extends Used{
    constructor(template, player) {
        super(template, player);
        this.name = 'enchanting stone'
    }

    getDescription(){
        return 'upgrades quality of item'
    }

    async use(){
        let data = this.player.inv.pull.filter(elem => elem.name && elem.item_type === 1 && elem.slot > 8)
        let options = []
        data.forEach(elem => {
            options.push({
                'name': elem.name + ' (' + elem.getQualityString() + ')',
                'id': elem.id,
            })
        })

        Functions.createOptionsModal(options, this, 'choose item')
    }

    async chooseOption(option_id){
        let data = await CharacterService.upgradeItemQuality(this.player.id, option_id)
        console.log(data)
        if(data.success){
            this.player.inv.deleteItem(this)
            this.player.inv.update(data.data.items)
        }
    }
}