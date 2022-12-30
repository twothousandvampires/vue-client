import Functions from "../../GameFunctions";

export default class CasterBehavior{

    constructor(unit) {
        this.unit = unit
    }

    getState(fight_context){
        let player = fight_context.player
        let distance_to_player = Functions.distance(this.unit, player)
        let range = this.unit.getStat('looking_range')

        let can_to_cast = this.unit.skills.filter(skill => {
            return skill.canCast(fight_context)
        })


        if(can_to_cast.length){
            this.unit.casted_skill = can_to_cast[Math.floor(Math.random() * can_to_cast.length)]
            return 'cast'
        }
        else if(distance_to_player < range && !player.invisible){
            this.unit.move_angle = Functions.angle(player, this.unit)
            return 'move'
        }
        else {
            if(Math.random() > 0.5){
                this.unit.move_angle = Math.random() * 6.24
                return 'move'
            }
            else {
                return 'idle'
            }
        }
    }
}