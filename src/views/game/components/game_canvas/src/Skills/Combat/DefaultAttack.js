import Damage from "@/views/game/components/game_canvas/src/Scr/Damage";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import DamageSource from "@/views/game/components/game_canvas/src/Scr/DamageSource";

export default class DefaultAttack{
    constructor(owner) {
        this.owner = owner
    }

    getDamageDescription(){
        let d = new Damage(
            Damage.TYPE_HIT,
            Damage.SOURCE_ATTACK
        )

        let flat = Functions.random(this.owner.max_attack_damage, this.owner.min_attack_damage)
        let total = Functions.changeByPercent(flat, this.owner.getTotalIncreasedAttackDamage())
        d.addPhysicalSource(total)

        return d
    }
}