import GiantUndeadSprite from "./sprite/GiantUndeadSprite";
import Undead from "../src/Undead";
import BoneArmour from "@/views/game/components/game_canvas/src/Status/BoneArmour";

export default class GiantUndead extends Undead {
    constructor(context, x, y) {
        super(context, x, y)
        this.name = 'boned bones'
        this.state = undefined
        this.size_x = 144
        this.size_y = 144
        this.box_size_x = 60
        this.box_size_y = 25
        this.life = 42
        this.max_life = 42
        this.speed = 300
        this.fliped = true
        this.power = 100
        this.armour = 3
        this.resist = 10
        this.physical_damage = 12
        this.attack_block = 15
        this.sprite = new GiantUndeadSprite(this)
        this.init()
    }

    afterDamage(){
        let targets = this.figth_context.enemy_pull.filter(elem => elem !== this && !elem.isDead()).sort((a, b) => Math.random() > 0.5).slice(0, 3)
        targets.forEach(elem => {
            elem.newStatus(new BoneArmour(10, 3))
        })
    }
}