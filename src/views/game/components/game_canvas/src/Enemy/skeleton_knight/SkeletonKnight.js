import Undead from "../src/Undead";
import SkeletonKnightSprite from "./sprite/SkeletonKnightSprite";
export default class SkeletonKnight extends Undead{
    constructor(context, x, y) {
        super(context, x, y)
        this.size_x = 120
        this.size_y = 120
        this.sprite = new SkeletonKnightSprite(this)
        this.box_size_x = 40
        this.box_size_y = 20
        this.name = 'bones in armour'
        this.state = undefined
        this.speed = 800
        this.stateAct = undefined
        this.fliped = true
        this.power = 200
        this.armour = 8
        this.resist = 0
        this.life = 14
        this.max_life = 14
        this.physical_damage = 3
        this.attack_block = 20
        this.init()
    }
}