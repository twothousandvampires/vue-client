import Undead from "../src/Undead";
import PileOfSkullsSprite from "./sprite/PileOfSkullsSprite";
import SharpBoneAura from "@/views/game/components/game_canvas/src/Auras/SharpBoneAura";

export default class PileOfSkull extends Undead {
    constructor(context, x, y) {
        super(context,x, y)
        this.name = 'pile of skulls'
        this.state = undefined
        this.sprite = new PileOfSkullsSprite(this)
        this.size_x = 80
        this.size_y = 80
        this.box_size_x = 40
        this.box_size_y = 20
        this.life = 16
        this.max_life = 16
        this.speed = 100
        this.fliped = true
        this.power = 100
        this.armour = 6
        this.resist = 40
        this.physical_damage = 0
        this.attack_block = 0
        this.auras = [
            new SharpBoneAura(this)
        ]
        this.init()
    }
}