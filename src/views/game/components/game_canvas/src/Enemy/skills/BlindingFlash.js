import Blind from "@/views/game/components/game_canvas/src/Status/Blind";
import EnemySkill from "@/views/game/components/game_canvas/src/Enemy/skills/EnemySkill";

export default class BlindingFlash extends EnemySkill{
    constructor(owner) {
        super(owner)
        this.name = 'blinding flash'
        this.power = 4
    }

    action(player){
        player.takeSpellDamage(this.owner, 1)
        if(Math.random() <= 0.4){
            player.newStatus(new Blind(20, 3))
        }
    }

    check(target) {
        return !target.status.has(this.name)
    }
}