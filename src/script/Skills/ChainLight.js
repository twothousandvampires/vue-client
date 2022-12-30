import Functions from "../GameFunctions";
import EffectCreator from "../Effects/EffectCreator";
import ChainLightEffect from "../Effects/ChainLight";


export default class ChainLight{

    constructor() {
        this.chain_limit = 40
        this.chain_range = 400
    }

    cast(fight_context, cords) {
        let hited = []
        let target = fight_context.enemy.find(elem => Functions.pointInRect(cords.cord_x, cords.cord_y, elem))
        if (!target) {
            return
        }
        let player = fight_context.player
        this.chain(fight_context, player, target, hited, 0)

    }

    async chain(fight_context, from, to, hited, count){
        await Functions.sleep(150)
        let distance = Functions.distance(from, to)
        let angle = Functions.angle(from, to)
        hited.push(to)
        to.takeDamage()
        fight_context.effects.push(new ChainLightEffect((from.cord_x + to.cord_x)/2, (from.cord_y + to.cord_y)/2, distance, 0, angle))
        count ++
        if(count === this.chain_limit){
            return;
        }
        let target = fight_context.enemy.find(elem => Functions.distance(to, elem) < this.chain_range && !hited.includes(elem))
        if(!target){
            return
        }
        this.chain(fight_context, to, target, hited, count)
    }
}

