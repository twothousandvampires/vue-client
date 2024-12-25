import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import ShellingBeetleSprite from "@/views/game/components/game_canvas/src/Enemy/ShellingBeetle/ShellingBeetleSprite";

export default class ShellingBeetle extends Enemy{
    constructor(context, x, y) {
        super(context, x, y);
        this.name = 'shelling beetle'
        this.speed = 900
        this.size_x = 100
        this.size_y = 100
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite = new ShellingBeetleSprite(this)
        this.fliped = false
        this.power = 400
        this.armour = 5
        this.resist = 0
        this.life = 22
        this.max_life = 22
        this.physical_damage = 0
        this.magic_damage = 2
        this.evade = 10
        this.caster = false
        this.piercing_damage_resist = 2
        this.cutting_damage_resist = 2
        this.cold_damage_resist = 2
        this.init()
    }
}