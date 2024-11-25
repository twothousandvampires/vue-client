import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import PachydermatousSprite from "@/views/game/components/game_canvas/src/Enemy/Pachydermatous/PachydermatousSprite";

export default class Pachydermatous extends Enemy{
    constructor(context, x, y) {
        super(context, x, y);
        this.name = 'pachydermatous'
        this.speed = 900
        this.size_x = 100
        this.size_y = 100
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite = new PachydermatousSprite(this)
        this.fliped = false
        this.power = 400
        this.armour = 20
        this.resist = 0
        this.life = 40
        this.max_life = 40
        this.physical_damage = 9
        this.magic_damage = 0
        this.evade = 2
        this.caster = false
        this.piercing_damage_resist = 0
        this.cutting_damage_resist = 0
        this.crushing_damage_resist = 0
        this.cold_damage_resist = 2
        this.init()
    }
}