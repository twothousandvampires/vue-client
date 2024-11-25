import EnemySkill from "@/views/game/components/game_canvas/src/Enemy/skills/EnemySkill";

export default class DefendOrders extends EnemySkill{
    constructor(owner) {
        super(owner)
        this.name = 'defend orders'
    }

    action(targets){
        targets.forEach(elem => {
            elem.attack_block += 5
            elem.armour += 2
        })
    }

    check(target) {
        return target.figth_context.enemy_pull.filter(elem => !elem.isDead() && elem !== this.owner).length >= 3
    }
}