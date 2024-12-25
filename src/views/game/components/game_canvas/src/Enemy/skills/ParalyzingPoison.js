import EnemySkill from "@/views/game/components/game_canvas/src/Enemy/skills/EnemySkill";
import ParalyzingPoisonEffect from "@/views/game/components/game_canvas/src/Status/ParalyzingPoisonEffect";

export default class ParalyzingPoison extends EnemySkill{
    constructor(owner) {
        super(owner)
        this.name = 'paralyzing poison'
    }

    action(player){
        player.newStatus(new ParalyzingPoisonEffect(5, 5))
    }

    check(target) {
        return !target.status.has(this.name)
    }
}