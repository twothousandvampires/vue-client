import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import ParalyzingArachnidSprite
    from "@/views/game/components/game_canvas/src/Enemy/ParalyzingArachnid/ParalyzingArachnidSprite";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import ParalyzingPoison from "@/views/game/components/game_canvas/src/Enemy/skills/ParalyzingPoison";

export default class ParalyzingArachnid extends Enemy{
    constructor(context, x, y) {
        super(context, x, y);
        this.name = 'paralyzing arachnid'
        this.speed = 900
        this.size_x = 100
        this.size_y = 100
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite = new ParalyzingArachnidSprite(this)
        this.fliped = false
        this.power = 400
        this.armour = 2
        this.resist = 0
        this.life = 12
        this.max_life = 12
        this.physical_damage = 3
        this.magic_damage = 1
        this.evade = 10
        this.caster = false
        this.piercing_damage_resist = 2
        this.cutting_damage_resist = 2
        this.cold_damage_resist = 2
        this.initiative = 10
        this.use_poison_rate = 20
        this.poisons = [
            new ParalyzingPoison(this)
        ]
        this.init()
    }

    async startTurn(enemies, player) {
        if(this.availableToTurn()){
            let target = this.getTarget(player)
            let checked_poisons = this.poisons.filter(elem => elem.check(target))
            if(checked_poisons.length && Math.random() <= this.use_poison_rate / 100) {
                let poison = checked_poisons[Math.floor(Math.random() * checked_poisons.length)]
                Functions.createModal(this, 'use ' + poison.name)
                poison.action(target, enemies)
            }
            else {
                Functions.createModal(this, 'attack!',16,'white', true)
                target.takeDamage(this)
            }
        }

        await this.afterTurn()
    }
}