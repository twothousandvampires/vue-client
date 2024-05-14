import RaiseTheUndeadEffect from "../../Effects/RaiseTheUndead/RaiseTheUndeadEffect";
export default class RaiseTheUndead {
    constructor(owner) {
        this.owner = owner
        this.cd = false
        this.effect_y_offset = 80
    }

    cast(){
        let context = this.owner.figth_context
        let enemy = context.enemy

        let to_resurrect = enemy.filter(elem => {
            return elem.canResurect()
        })

        if(to_resurrect.length){
            let to_res = to_resurrect[Math.floor(Math.random() * to_resurrect.length)]
            let status = new RaiseTheUndeadEffect(this.owner.figth_context,
                                                 to_res.point.x,
                                                 to_res.point.y - this.effect_y_offset,
                                                 to_res.size_x,
                                                 to_res.size_y)
            this.owner.figth_context.effects.push(status)
            to_res.resurectState()
            this.cd = true
        }

        setTimeout(()=> {
            this.cd = false
        }, 6000)
    }


    canCast(){
        let context = this.owner.figth_context
        let enemy = context.enemy
        return enemy.some(elem => {
            return elem.canResurect()
        })
    }
}