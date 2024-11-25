import EnemySkill from "@/views/game/components/game_canvas/src/Enemy/skills/EnemySkill";

export default class LastOrders extends EnemySkill{
    constructor(owner) {
        super(owner)
        this.name = 'last orders'
    }

    action(targets){
        targets.forEach(elem => {
            elem.addLife(5)
        })
    }
}