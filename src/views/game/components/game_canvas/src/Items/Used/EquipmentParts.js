import Used from "@/views/game/components/game_canvas/src/Items/Used/Used.js";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import requestService from "@/views/game/services/requestService";

export default class EquipmentParts extends Used{
    constructor(template, player) {
        super(template, player);
        this.name = 'equipment parts'
    }

    getDescription(){
        return 'adds a propery on item which can be on this item class'
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
        let data = await requestService.addPropertyOnItem(this.player.id, option_id, this.id, 'class')
        if(data.success){
            this.player.inv.update(data.data.items)
        }
        else{
            alert(data.error)
        }
    }
}