import EnemySkill from "@/views/game/components/game_canvas/src/Enemy/skills/EnemySkill";

export default class WeakSoul extends EnemySkill{
    constructor(owner) {
        super(owner)
        this.name = 'weak soul'
        this.power = 30
    }

    action(player){
        let resist = player.resistCast(this)
        if(!resist){
            player.reduceEnergy(30)
        }
    }

    check(target) {
        return target.energy > 20
    }
}