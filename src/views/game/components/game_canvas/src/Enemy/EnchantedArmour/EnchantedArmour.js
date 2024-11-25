import Undead from "../src/Undead";
import EnchantedArmourSprite from "@/views/game/components/game_canvas/src/Enemy/EnchantedArmour/EnchantedArmourSprite";

export default class EnchantedArmour extends Undead {
    constructor(context, x, y) {
        super(context, x, y)
        this.name = 'enchanted armour'
        this.state = undefined
        this.sprite = new EnchantedArmourSprite(this)

        this.box_size_x =40
        this.box_size_y =20
        this.size_x = 75
        this.size_y = 75
        this.fliped = true
        this.power = 400
        this.armour = 20
        this.resist = 0
        this.life = 25
        this.max_life = 25
        this.magic_damage = 4
        this.speed = 700
        this.physical_damage = 4
        this.evade = 0
        this.lightning_damage_resist = 2
        this.fliped = false
        this.init()
    }

}