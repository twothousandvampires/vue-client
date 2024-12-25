import Undead from "../src/Undead";
import LivingFleshSprite from "@/views/game/components/game_canvas/src/Enemy/LivingFlesh/LivingFleshSprite";

export default class LivingFlesh extends Undead{
    constructor(context, x, y, power = 1) {
        super(context, x, y)
        //draw size on canvas

        this.sprite = new LivingFleshSprite(this)
        this.evade = 0
        this.attack_block = 0
        //in game size
        this.box_size_x = 40
        this.box_size_y = 20
        this.box_size_z = 64
        this.size_x = 100
        this.size_y = 100

        this.name = 'living flesh'
        this.speed = 300

        this.stateAct = undefined
        this.state = undefined

        this.power = 150
        this.armour = 2
        this.resist = 20
        this.max_life = 16
        this.life = 16
        this.physical_damage = 2
        this.piercing_damage_resist = 1
        this.cutting_damage_resist = 2
        this.crushing_damage_resist = 1
        this.initiative = 1
        this.init()
    }
}