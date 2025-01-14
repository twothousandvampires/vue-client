import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import TheBeehiveDraggerSprite from "./TheBeehiveDraggerSprite";

export default class TheBeehiveDragger extends Enemy{
    constructor(context, x, y) {
        super(context, x, y);
        this.name = 'the beehive dragger'
        this.speed = 200
        this.size_x = 100
        this.size_y = 100
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite = new TheBeehiveDraggerSprite(this)
        this.fliped = false
        this.power = 500
        this.armour = 0
        this.resist = 0
        this.life = 50
        this.max_life = 50
        this.physical_damage = 0
        this.magic_damage = 0
        this.evade = 0
        this.caster = false
        this.initiative = 1
        this.init()
    }

    afterDamage(){
        if(Math.random() < 0.2){
            this.fight_context.pushEnemyInFreeSlot('swarm')
        }
    }
}