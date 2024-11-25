import SkeletonWizard from "../skeleton_wizard/SkeletonWizard";
import SkeletonWarrior from "../SkeletonWarrior/SkeletonWarrior";
import SkeletonArcher from "../skeletonArcher/SkeletonArcher";
import GiantUndead from "../giant_undeda/GiantUndead";

export default class ArmyOfTheDeadCast {
    constructor(owner) {
        this.owner = owner
        this.cd = false
    }

    cast(){
        let fight_context = this.owner.figth_context

        let sw = new SkeletonWarrior(fight_context, 0, 0)
        sw.resurectState()
        fight_context.addEnemyToBattle(sw, this.owner.point.x - 50, this.owner.point.y)

        let sa = new SkeletonArcher(fight_context, 0, 0)
        sa.resurectState()
        fight_context.addEnemyToBattle(sa, this.owner.point.x + 50, this.owner.point.y)

        let gu = new GiantUndead(fight_context, 0, 0)
        gu.resurectState()
        fight_context.addEnemyToBattle(gu, this.owner.point.x, this.owner.point.y - 50)

        let swi = new SkeletonWizard(fight_context, 0, 0)
        swi.resurectState()
        fight_context.addEnemyToBattle(swi, this.owner.point.x, this.owner.point.y + 50)

        this.cd = true
        setTimeout(()=> {
            this.cd = false
        }, 20000)
    }

    canCast(){
        let fight_context = this.owner.figth_context
        return fight_context.enemy.length < 100 && !this.cd
    }

}