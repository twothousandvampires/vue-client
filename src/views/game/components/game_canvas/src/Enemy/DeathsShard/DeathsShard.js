import Undead from "../src/Undead";
import DeathsShardSprite from "@/views/game/components/game_canvas/src/Enemy/DeathsShard/DeathsShardSprite";

export default class DeathsShard extends Undead{
    constructor(context, x, y, power = 1) {
        super(context, x, y)
        //draw size on canvas
        this.size_x = 100
        this.size_y = 100
        this.sprite = new DeathsShardSprite(this)
        this.evade = 0
        this.attack_block = 0
        //in game size
        this.box_size_x = 40
        this.box_size_y = 20
        this.box_size_z = 64

        this.name = 'shard of death'
        this.speed = 800

        this.stateAct = undefined
        this.state = undefined

        this.power = 150
        this.armour = 1
        this.resist = 0
        this.life = 20
        this.max_life = 20
        this.physical_damage = 0
        this.magic_damage = 12
        this.piercing_damage_resist = 0
        this.cutting_damage_resist = 0
        this.crushing_damage_resist = 0
        this.physical_damage_resist = 0
        this.init()
    }
}