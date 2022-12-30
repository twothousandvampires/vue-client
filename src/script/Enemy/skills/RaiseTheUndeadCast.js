import Functions from "../../GameFunctions";
import router from "../../../router";
import RaiseTheUndeadEffect from "../../Effects/RaiseTheUndeadEffect";
export default class RaiseTheUndeadCast{
    constructor(owner) {
        this.owner = owner
        this.cd = false
    }

    cast(fight_context){
        let enemy = fight_context.enemy
        let to_resurrect = enemy.filter(elem => {
            return elem.canResurect()
        })

        let to_res = to_resurrect[Math.floor(Math.random() * to_resurrect.length)]
        to_res.setState('resurrect')

        fight_context.effects.push(new RaiseTheUndeadEffect(to_res.cord_x, to_res.cord_y - 40, to_res.size_x,  to_res.size_y))

        this.cd = true
        setTimeout(()=> {
            this.cd = false
        }, 6000)
    }


    canCast(fight_context){
        let enemy = fight_context.enemy
        return enemy.some(elem => {
            return elem.canResurect()
        })
    }
}