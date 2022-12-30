export default class Fatest{
    constructor(parent) {
        this.parent = parent
        this.parent.triger_type = 'attack_hit'
        this.parent.trigger = function (fight_context){
            let player = fight_context.player
            player.energy += 100
        }
    }
}