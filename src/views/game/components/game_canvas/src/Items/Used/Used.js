import Item from "../Item";
import requestService from "../../../../../services/requestService";

export default class Used extends Item{

    constructor(template, player){
        super(template, player)
        this.charges_to_use = 0
        this.charges = template.details.charges
        this.power = template.details.power
        this.can_create_combo = false
        this.decrease_action_point = true
        this.have_action = false
    }
    async afterUse(){
        let res = await requestService.serverRequest('use_item', { ids_list: [this.id]})
        if(res.success){
            this.player.parseStats(res.data.char)
        }
    }
    getDescription(){

    }
    getTotalPotionPower(){
        return Math.floor(this.power * (1 + this.player.increased_potion_effect / 100))
    }

    canUse(enemy = undefined){
        return enemy && !enemy.isDead();
    }
}