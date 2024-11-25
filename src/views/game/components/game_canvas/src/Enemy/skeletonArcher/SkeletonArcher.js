import SkeletonArcherSprite from "./sprite/SkeletonArcherSprite";
import Undead from "../src/Undead";

export default class SkeletonArcher extends Undead{

    constructor(context,x, y) {
        super(context,x, y);
        this.size_x = 100
        this.size_y = 100
        this.sprite = new SkeletonArcherSprite(this)
        this.box_size_x = 40
        this.box_size_y = 20
        this.name =  'shooting bones'
        this.state = undefined
        this.speed = 700
        this.stateAct = undefined
        this.init()
        this.armour = 0
        this.resist = 0
        this.life = 6
        this.max_life = 6
        this.power = 200
        this.physical_damage = 3
    }
}