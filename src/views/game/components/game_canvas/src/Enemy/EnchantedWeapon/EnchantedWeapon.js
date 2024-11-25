import Undead from "../src/Undead";
import EnchantedWeaponSprite from "@/views/game/components/game_canvas/src/Enemy/EnchantedWeapon/EnchantedWeaponSprite";

export default class EnchantedWeapon extends Undead {
    constructor(context, x, y) {
        super(context, x, y)
        this.name = 'enchanted weapon'
        this.state = undefined
        this.sprite = new EnchantedWeaponSprite(this)

        this.box_size_x =40
        this.box_size_y =20
        this.size_x = 75
        this.size_y = 75
        this.fliped = true
        this.power = 400
        this.armour = 0
        this.resist = 0
        this.life = 14
        this.max_life = 14
        this.magic_damage = 2
        this.speed = 700
        this.physical_damage = 6
        this.evade = 25
        this.lightning_damage_resist = 2
        this.fliped = false
        this.init()
    }

}