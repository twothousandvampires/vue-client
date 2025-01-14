import EnemySkill from "@/views/game/components/game_canvas/src/Enemy/skills/EnemySkill";

export default class TacticOrders extends EnemySkill{
    constructor(owner) {
        super(owner)
        this.name = 'tactic  orders'
    }

    action(targets){
        targets.forEach(elem => {
            elem.evade += 5
            elem.speed += 200
            elem.initiative += 2
        })
    }

    check(target) {
        return target.fight_context.enemy_pull.filter(elem => !elem.isDead() && elem !== this.owner).length >= 3
    }
}