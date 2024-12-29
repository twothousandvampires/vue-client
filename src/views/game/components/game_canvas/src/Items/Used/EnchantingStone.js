import Used from "@/views/game/components/game_canvas/src/Items/Used/Used.js";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import requestService from "@/views/game/services/requestService";

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
        let res = await requestService.serverRequest('upgrade_item_quality', {item_id: option_id, used_id: this.id})
        if(res.success){
            this.player.inv.update(res.data.items)
        }
    }
}