import Functions from "../../GameFunctions";
export default class MeleeBehavior{

    constructor(unit) {
        this.unit = unit
        this.behavior_timer = 0
    }

    getState(fight_context){
        let player = fight_context.player
        let distance_to_player = Functions.distance(this.unit, player)

        let range = this.unit.getStat('looking_range')
        if(distance_to_player < this.unit.getStat('attack_range') && !player.invisible){
            return 'attack'
        }
        else if(distance_to_player < range && !player.invisible){
            return 'move'
        }
        else {
            return 'idle'
        }
    }
}