import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import EnemySkill from "@/views/game/components/game_canvas/src/Enemy/skills/EnemySkill";

export default class StrengthPotion extends EnemySkill{
    constructor(owner) {
        super(owner)
        this.name = 'strength potion'
        this.power = 1
    }

    action(player){
        let list = player.figth_context.enemy_pull.filter(elem => !elem.isDead() && elem !== this.owner)

        if(list.length){
            let target = list[Math.floor(Math.random() * list.length)]
            Functions.createModal(target, 'become stronger')
            target.physical_damage += this.power
            target.armour += this.power * 2
        }
    }

    check(target) {
        return target.figth_context.enemy_pull.filter(elem => !elem.isDead() && elem !== this.owner).length !== 0
    }
}