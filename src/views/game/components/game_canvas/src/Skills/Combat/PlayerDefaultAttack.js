import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import Damage from "@/views/game/components/game_canvas/src/Scr/Damage";
import DamageSource from "@/views/game/components/game_canvas/src/Scr/DamageSource";

export default class PlayerDefaultAttack{
    constructor(owner) {
        this.owner = owner
    }

    getDamageDescription(){
        let flat = Functions.random(this.owner.max_attack_damage, this.owner.min_attack_damage)
        let total = Functions.changeByPercent(flat, this.owner.getTotalIncreasedAttackDamage())

        let damage = new Damage(Damage.SOURCE_ATTACK, Damage.TYPE_HIT)
        damage.addPhysicalSource(total)

        return damage
    }

    killingBlow(unit){
        this.owner.kill(unit)
    }

    getPointForKnockBack(){
        return this.owner
    }
}