import Item from "../Item";

export default class Used extends Item{

    constructor(template, player){
        super(template, player)
        this.charges_to_use = 0
        this.power = template.details.power
    }
    afterUse(){

    }
    getDescription(){

    }

    canUse(enemy = undefined){
        return enemy && !enemy.isDead();
    }
}