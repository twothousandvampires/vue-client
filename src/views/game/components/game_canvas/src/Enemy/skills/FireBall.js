import Ignite from "@/views/game/components/game_canvas/src/Status/Ignite/Ignite";
import EnemySkill from "@/views/game/components/game_canvas/src/Enemy/skills/EnemySkill";

export default class FireBall extends EnemySkill{
    constructor(owner) {
        super(owner)
        this.name = 'fire ball'
        this.power = 4
    }

    action(player){
        player.takeSpellDamage(this.owner, this.power)
        if(Math.random() <= 0.2){
            player.newStatus(new Ignite(2, 3))
        }
    }
}