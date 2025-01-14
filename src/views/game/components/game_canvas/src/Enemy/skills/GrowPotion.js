import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import EnemySkill from "@/views/game/components/game_canvas/src/Enemy/skills/EnemySkill";

export default class GrowPotion extends EnemySkill{
    constructor(owner) {
        super(owner)
        this.name = 'grow potion'
        this.power = 2
    }

    action(player){
        let list = player.fight_context.enemy_pull.filter(elem => !elem.isDead() && elem !== this.owner)

        if(list.length){
            let target = list[Math.floor(Math.random() * list.length)]
            Functions.createModal(target, 'grows!')
            target.max_life += this.power
            target.life = target.max_life
        }
    }

    check(target) {
        return target.fight_context.enemy_pull.filter(elem => !elem.isDead() && elem !== this.owner).length !== 0
    }
}