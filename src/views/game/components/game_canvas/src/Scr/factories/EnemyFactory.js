import SkeletonWarrior from "../../Enemy/SkeletonWarrior/SkeletonWarrior";
import SkeletonArcher from "../../Enemy/skeleton_archer/SkeletonArcher";
import SkeletonWizard from "../../Enemy/skeleton_wizard/SkeletonWizard";
import GiantUndead from "../../Enemy/giant_undeda/GiantUndead";
import Lich from "../../Enemy/lich/Lich";
import Ghost from "../../Enemy/ghost/Ghost";
import PileOfSkull from "../../Enemy/pile_of_skull/PileOfSkull";
import SkeletonKnight from "../../Enemy/skeleton_knight/SkeletonKnight";

export default class EnemyFactory {
    constructor() {

    }

    create(name, context){
        switch (name){
            case 'skeleton warrior':
                return new SkeletonWarrior(context)
            case 'skeleton archer':
                return new SkeletonArcher(context)
            case 'skeleton mage':
                return new SkeletonWizard(context)
            case 'ghost':
                return new Ghost(context)
            case 'pile of skull':
                return new PileOfSkull(context)
            case 'giant undead':
                return new GiantUndead(context)
            case 'lich':
                return new Lich(context)
            case 'skeleton knight':
                return new SkeletonKnight(context)
        }
    }
}