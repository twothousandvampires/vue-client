import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import ProtectiveMineralsSprite from "./ProtectiveMineralsSprite";

export default class ProtectiveMinerals extends Enemy{
    constructor(context, x, y) {
        super(context, x, y);
        this.name = 'protective minerals'
        this.speed = 400
        this.size_x = 100
        this.size_y = 100
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite = new ProtectiveMineralsSprite(this)
        this.fliped = false
        this.power = 400
        this.armour = 40
        this.resist = 60
        this.life = 6
        this.max_life = 6
        this.physical_damage = 3
        this.magic_damage = 0
        this.evade = 0
        this.caster = false
        this.piercing_damage_resist = 0
        this.cutting_damage_resist = 0
        this.lightning_damage_resist = 2
        this.cutting_damage_resist = 2
        this.initiative = 2
        this.init()
    }
}