import Undead from "./../src/Undead";
import LichSprite from "./sprite/LichSprite";

export default class Lich extends Undead{

    constructor(context, x, y) {
        super(context, x, y);
        this.name = 'bones of greatest sorcerer'
        this.speed = 1200
        this.size_x = 126 * 1.3
        this.size_y = 126 * 1.3
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite = new LichSprite(this)
        this.fliped = true
        this.power = 700
        this.armour = 1
        this.resist = 80
        this.life = 40
        this.max_life = 40
        this.physical_damage = 10
        this.magic_damage = 70
        this.evade = 1
        this.mana = 5
        this.caster = false
        this.init()
    }
}