import Undead from "../src/Undead";
import CaveBatSprite from "@/views/game/components/game_canvas/src/Enemy/CaveBat/CaveBatSprite";

export default class CaveBat extends Undead{
    constructor(context, x, y, power = 1) {
        super(context, x, y)
        //draw size on canvas
        this.size_x = 100
        this.size_y = 100
        this.sprite = new CaveBatSprite(this)
        this.evade = 20
        this.attack_block = 0
        //in game size
        this.box_size_x = 40
        this.box_size_y = 20
        this.box_size_z = 64

        this.name = 'cave bat'
        this.speed = 1300
        this.stateAct = undefined
        this.state = undefined

        this.power = 100
        this.armour = 0
        this.life = 2
        this.max_life = 2
        this.physical_damage = 1
        this.magic_damage = 0
        this.fire_damage_resist = 2
        this.piercing_damage_resist = 2
        this.init()
    }
}