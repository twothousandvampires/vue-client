import Used from "@/views/game/components/game_canvas/src/Items/Used/Used.js";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import CharacterService from "@/views/game/services/CharacterService";

export default class CrystalHammer extends Used{
    constructor(template, player) {
        super(template, player);
        this.name = 'crystal hammer'
    }

    getDescription(){
        return 'increases effect of all properties on item by 2-10%'
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
        let data = await CharacterService.upgradeItemEffect(this.player.id, option_id)
        if(data.success){
            this.player.inv.deleteItem(this)
            this.player.inv.update(data.data.items)
        }
    }
}