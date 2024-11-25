import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import GreenskinProphetSprite
    from "@/views/game/components/game_canvas/src/Enemy/GreenskinProphet/GreenskinProphetSprite";
import FireBall from "@/views/game/components/game_canvas/src/Enemy/skills/FireBall";
import WeakSoul from "@/views/game/components/game_canvas/src/Enemy/skills/WeakSoul";


export default class GreenskinProphet extends Enemy{
    constructor(context, x, y) {
        super(context, x, y);
        this.name = 'greenskin prophet'
        this.speed = 750
        this.size_x = 100
        this.size_y = 100
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite = new GreenskinProphetSprite(this)
        this.fliped = false
        this.power = 210
        this.armour = 0
        this.resist = 0
        this.life = 10
        this.max_life = 10
        this.physical_damage = 0
        this.magic_damage = 4
        this.evade = 15
        this.caster = true
        this.fire_damage_resist = 2
        this.caster = true
        this.mana = 2
        this.priority_for_spellcasting = 70
        this.casts = [
            new FireBall(this),
            new WeakSoul(this)
        ]
        this.piercing_damage_resist = 2
        this.init()
    }
}