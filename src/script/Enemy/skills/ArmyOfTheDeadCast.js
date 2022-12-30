import SkeletonWizard from "../SkeletonWizard";
import SkeletonWarrior from "../SkeletonWarrior";
import SkeletonArcher from "../SkeletonArcher";
import GiantUndead from "../GiantUndead";

export default class ArmyOfTheDeadCast {
    constructor(owner) {
        this.owner = owner
        this.cd = false
    }

    cast(fight_context){
        let sw = new SkeletonWarrior(this.owner.cord_x - 50, this.owner.cord_y)
        sw.setState('resurrect')

        let sa = new SkeletonArcher(this.owner.cord_x + 50, this.owner.cord_y)
        sa.setState('resurrect')

        let gu = new GiantUndead(this.owner.cord_x, this.owner.cord_y - 50)
        gu.setState('resurrect')

        let swi = new SkeletonWizard(this.owner.cord_x, this.owner.cord_y + 50)
        swi.setState('resurrect')

        fight_context.enemy.push(sw)
        fight_context.enemy.push(swi)
        fight_context.enemy.push(sa)
        fight_context.enemy.push(gu)

        this.cd = true
        setTimeout(()=> {
            this.cd = false
        }, 1000)
    }

    canCast(fight_context){
        return fight_context.enemy.length < 100 && !this.cd
    }

}