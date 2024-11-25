import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import GoblinMixologistSprite
    from "@/views/game/components/game_canvas/src/Enemy/GoblinMixologist/GoblinMixologistSprite";
import GrowPotion from "@/views/game/components/game_canvas/src/Enemy/skills/GrowPotion";
import Functions from "@/views/game/components/game_canvas/src/GameFunctions";
import StrengthPotion from "@/views/game/components/game_canvas/src/Enemy/skills/StrengthPotion";
import ToxicPotion from "@/views/game/components/game_canvas/src/Enemy/skills/ToxicPotion";


export default class GoblinMixologist extends Enemy{
    constructor(context, x, y) {
        super(context, x, y);
        this.name = 'greenskin potion thwower'
        this.speed = 900
        this.size_x = 100
        this.size_y = 100
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite = new GoblinMixologistSprite(this)
        this.fliped = false
        this.power = 210
        this.armour = 1
        this.resist = 0
        this.life = 12
        this.max_life = 12
        this.physical_damage = 3
        this.magic_damage = 1
        this.evade = 12
        this.caster = false
        this.fire_damage_resist = 2
        this.piercing_damage_resist = 2
        this.potion_use_count = 2
        this.poution_use_chance = 40
        this.poutions = [
            new GrowPotion(this),
            new StrengthPotion(this),
            new ToxicPotion(this)
        ]
        this.init()
    }
    async startTurn(enemies, player) {
        if(this.availableToTurn()){
            let target = this.getTarget(player)
            let checked_potions = this.poutions.filter(elem => elem.check(target))
            if(checked_potions.length && this.potion_use_count > 0 && Math.random() <= this.poution_use_chance / 100) {
                let potion = checked_potions[Math.floor(Math.random() * checked_potions.length)]
                Functions.createModal(this, 'use ' + potion.name)
                potion.action(target, enemies)
                this.potion_use_count --
            }
            else {
                Functions.createModal(this, 'attack!',16,'white', true)
                target.takeDamage(this)
            }
        }

        await this.afterTurn()
    }
    dyingAct(battle){
        if (this.sprite.isSpriteLoopEnd()) {
            this.figth_context.clearCellContent(this)
        }
    }
}