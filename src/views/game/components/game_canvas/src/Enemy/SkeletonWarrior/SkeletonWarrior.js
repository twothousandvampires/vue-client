import SkeletonWarriorSprite from "./Sprite/SkeletonWarriorSprite";
import Undead from "../src/Undead";

export default class SkeletonWarrior extends Undead{
    constructor(context, x, y, power = 1) {
        super(context, x, y)
        //draw size on canvas
        this.size_x = 100
        this.size_y = 100
        this.sprite = new SkeletonWarriorSprite(this)

        //in game size
        this.box_size_x = 40
        this.box_size_y = 20
        this.box_size_z = 64

        this.name = 'bones'
        this.speed = 600

        this.stateAct = undefined
        this.state = undefined

        this.power = 150
        this.armour = 1
        this.resist = 0
        this.max_life = 6
        this.life = 6
        this.physical_damage = 3
        this.init()
    }
}