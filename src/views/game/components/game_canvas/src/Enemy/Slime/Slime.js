import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import SlimeSprite from "./SlimeSprite";

export default class Slime extends Enemy{
    constructor(context, x, y) {
        super(context, x, y);
        this.name = 'slime'
        this.speed = 600
        this.size_x = 100
        this.size_y = 100
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite = new SlimeSprite(this)
        this.fliped = false
        this.power = 400
        this.armour = 0
        this.resist = 80
        this.life = 14
        this.max_life = 14
        this.physical_damage = 0
        this.magic_damage = 3
        this.evade = 20
        this.caster = false
        this.lightning_damage_resist = 2
        this.piercing_damage_resist = 0
        this.crusing_damage_resitst = 0
        this.cutting_damage_resist = 0
        this.init()
    }
}