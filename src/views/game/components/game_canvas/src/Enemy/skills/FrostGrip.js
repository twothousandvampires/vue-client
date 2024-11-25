import Freeze from "@/views/game/components/game_canvas/src/Status/Freeze/Freeze";
import EnemySkill from "@/views/game/components/game_canvas/src/Enemy/skills/EnemySkill";

export default class FrostGrip extends EnemySkill{
    constructor(owner) {
        super(owner)
        this.name = 'frost grip'
        this.power = 6
    }

    action(player){
        player.takeSpellDamage(this.owner, this.power)
        if(Math.random() <= 0.2){
            player.newStatus(new Freeze(1))
        }
    }
}