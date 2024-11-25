import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import CentipedeSprite from "@/views/game/components/game_canvas/src/Enemy/Centipede/CentipedeSprite";

export default class Centipede extends Enemy{
    constructor(context, x, y) {
        super(context, x, y);
        this.name = 'centipede'
        this.speed = 600
        this.size_x = 100
        this.size_y = 100
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite = new CentipedeSprite(this)
        this.fliped = false
        this.power = 400
        this.armour = 8
        this.resist = 0
        this.life = 8
        this.max_life = 8
        this.physical_damage = 3
        this.magic_damage = 0
        this.evade = 2
        this.caster = false
        this.piercing_damage_resist = 2
        this.cold_damage_resist = 2
        this.init()
    }
}