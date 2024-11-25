import SoulVortexStatus from "@/views/game/components/game_canvas/src/Status/SoulVortex";
import EnemySkill from "@/views/game/components/game_canvas/src/Enemy/skills/EnemySkill";

export default class SoulVortex extends EnemySkill{
    constructor(owner) {
        super(owner)
        this.name = 'soul vortex'
    }

    action(){
        let fight_context = this.owner.figth_context
        let player = fight_context.player
        player.newStatus(new SoulVortexStatus(1, 3), this.owner)
    }

    check(target) {
        return !target.status.has(this.name)
    }
}