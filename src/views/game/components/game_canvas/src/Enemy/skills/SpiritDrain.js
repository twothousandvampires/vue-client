import EnemySkill from "@/views/game/components/game_canvas/src/Enemy/skills/EnemySkill";

export default class WeakSoul extends EnemySkill{
    constructor(owner) {
        super(owner)
        this.name = 'weak soul'
        this.power = 3
    }

    action(player){
        let resist = player.resistCast(this)
        if(!resist){
            player.magic_damage -= this.power
            this.owner.magic_damage += this.power
        }
    }

    check(target) {
        return target.magic_damage > 0
    }
}