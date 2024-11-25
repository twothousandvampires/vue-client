import EnemySkill from "@/views/game/components/game_canvas/src/Enemy/skills/EnemySkill";

export default class AttackOrders extends EnemySkill{
    constructor(owner) {
        super(owner)
        this.name = 'attack orders'
    }

    action(targets){
        targets.forEach(elem => {
            elem.attack_crit_chance += 5
            elem.physical_damage += 1
        })
    }

    check(target) {
        return target.figth_context.enemy_pull.filter(elem => !elem.isDead() && elem !== this.owner).length >= 3
    }
}