import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import SittingOnTheBeastSprite
    from "@/views/game/components/game_canvas/src/Enemy/SittingOnTheBeast/SittingOnTheBeastSprite";
import Unit from "@/views/game/components/game_canvas/src/Scr/Unit";
import WarDrums from "@/views/game/components/game_canvas/src/Auras/WarDrums";

export default class SittingOnTheBeast extends Enemy{
    constructor(context, x, y) {
        super(context, x, y);
        this.name = 'sitting on the beast'
        this.speed = 600
        this.size_x = 180
        this.size_y = 180
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite = new SittingOnTheBeastSprite(this)
        this.fliped = false
        this.power = 250
        this.armour = 6
        this.resist = 0
        this.life = 30
        this.max_life = 30
        this.physical_damage = 6
        this.magic_damage = 0
        this.evade = 0
        this.caster = false
        this.fire_damage_resist = 2
        this.piercing_damage_resist = 2
        this.init()
        this.auras = [
            new WarDrums(this)
        ]
    }

    deadState(){
        this.fight_context.pushEnemyInFreeSlot('greenskin')
        this.state = Unit.STATE_DEAD
        this.resetState()
        this.stateAct = this.deadAct
    }
}