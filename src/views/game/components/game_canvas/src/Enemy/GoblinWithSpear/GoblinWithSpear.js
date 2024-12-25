import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import GoblinWithSpearSprite from "@/views/game/components/game_canvas/src/Enemy/GoblinWithSpear/GoblinWithSpearSprite";

export default class GoblinWithSpear extends Enemy{
    constructor(context, x, y) {
        super(context, x, y);
        this.name = 'greenskin'
        this.speed = 950
        this.size_x = 100
        this.size_y = 100
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite = new GoblinWithSpearSprite(this)
        this.fliped = true
        this.power = 200
        this.armour = 2
        this.resist = 0
        this.life = 4
        this.max_life = 4
        this.physical_damage = 2
        this.magic_damage = 0
        this.evade = 15
        this.caster = false
        this.fire_damage_resist = 2
        this.piercing_damage_resist = 2
        this.init()
        this.initiative = 8
    }
}