import BreakArmour from "@/views/game/components/game_canvas/src/Status/BreakArmour";
import EnemySkill from "@/views/game/components/game_canvas/src/Enemy/skills/EnemySkill";

export default class RottenArmour extends EnemySkill{
    constructor(owner) {
        super(owner)
        this.name = 'rotten armour'
    }

    action(player){
        player.newStatus(new BreakArmour(10, 3))
    }

    check(target) {
        return !target.status.has(this.name)
    }
}