import Undead from "../src/Undead";
import GhostSprite from "./sprite/GhostSprite";
import RottenArmour from "@/views/game/components/game_canvas/src/Enemy/skills/RottenArmour";
import WeakSoul from "@/views/game/components/game_canvas/src/Enemy/skills/WeakSoul";
import FrostGrip from "@/views/game/components/game_canvas/src/Enemy/skills/FrostGrip";

export default class Ghost extends Undead {
    constructor(context, x, y) {
        super(context, x, y)
        this.name = 'fantasm'
        this.state = undefined
        this.sprite = new GhostSprite(this)

        this.box_size_x =40
        this.box_size_y =20
        this.size_x = 100
        this.size_y = 100
        this.fliped = true
        this.power = 250
        this.armour = 0
        this.resist = 20
        this.life = 7
        this.max_life = 7
        this.damage = 2
        this.speed = 1600
        this.physical_damage = 1
        this.magic_damage = 3
        this.evade = 10
        this.caster = true
        this.mana = 3
        this.priority_for_spellcasting = 50
        this.casts = [
            new RottenArmour(this),
            new WeakSoul(this),
            new FrostGrip(this)
        ]
        this.init()
    }

    idleAct(fight_context){
        if(this.sprite.isSpriteLoopEnd()){
            this.idleState()
        }
    }
}