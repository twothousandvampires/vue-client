import Functions from "../../GameFunctions";
export default class ArcherBehavior{

    constructor(unit) {
        this.unit = unit
    }

    getState(fight_context){
        let player = fight_context.player
        let distance_to_player = Functions.distance(this.unit, player)
        let attack_range = this.unit.getStat('attack_range')
        let range = this.unit.getStat('looking_range')
        let escape_radius = this.unit.getStat('escape_radius')

        if(attack_range && distance_to_player < attack_range){
            return 'melee attack'
        }
        else if(escape_radius > distance_to_player){
            if(Math.random() > 0.5){
                this.unit.move_angle = Functions.angle( player, this.unit)
                return 'move'
            }
            else {
                return 'range attack'
            }
        }
        else if(distance_to_player < range && !player.invisible){
            return 'range attack'
        }
        else {
            return 'idle'
        }
    }
}