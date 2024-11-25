import ToxicPotionStatus from "@/views/game/components/game_canvas/src/Status/ToxicPotion";
import EnemySkill from "@/views/game/components/game_canvas/src/Enemy/skills/EnemySkill";

export default class ToxicPotion extends EnemySkill{
    constructor(owner) {
        super(owner)
        this.name = 'toxic potion'
        this.power = 5
    }

    action(player){
        player.newStatus(new ToxicPotionStatus(this.power, 3), this.owner, true)
    }

    check(target) {
        return !target.status.has(this.name)
    }
}