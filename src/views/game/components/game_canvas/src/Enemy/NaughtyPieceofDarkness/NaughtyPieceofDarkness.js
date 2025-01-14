import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import NaughtyPieceofDarknessSprite from "./NaughtyPieceofDarknessSprite";

export default class NaughtyPieceofDarkness extends Enemy{
    constructor(context, x, y) {
        super(context, x, y);
        this.name = 'naughty piece of darkness'
        this.speed = 900
        this.size_x = 100
        this.size_y = 100
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite = new NaughtyPieceofDarknessSprite(this)
        this.fliped = false
        this.power = 300
        this.armour = 0
        this.resist = 90
        this.life = 8
        this.max_life = 8
        this.physical_damage = 2
        this.magic_damage = 2
        this.evade = 25
        this.caster = false
        this.init()
    }
   
    dyingAct(battle){
        if (this.sprite.isSpriteLoopEnd()) {
            this.fight_context.clearCellContent(this)
        }
    }
}