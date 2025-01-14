import EnemySkill from "@/views/game/components/game_canvas/src/Enemy/skills/EnemySkill";

export default class RaiseTheUndead extends EnemySkill{
    constructor(owner) {
        super(owner)
        this.name = 'raise bones'
    }

    action(){
        let list = this.owner.fight_context.enemy_pull.filter(elem => elem.isDead())
        if(list.length){
            list[Math.floor(Math.random() * list.length)].resurrectState()
        }
    }
    check() {
        let list = this.owner.fight_context.enemy_pull.filter(elem => elem.isDead())
        return list.length !== 0
    }
}