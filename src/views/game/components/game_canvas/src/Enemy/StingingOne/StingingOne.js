import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import StingingOneSprite from "./StingingOneSprite";
import Poison from "../../Status/Poison";
import Functions from "../../GameFunctions";

export default class StingingOne extends Enemy{
    constructor(context, x, y) {
        super(context, x, y);
        this.name = 'stinging one'
        this.speed = 1100
        this.size_x = 100
        this.size_y = 100
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite = new StingingOneSprite(this)
        this.fliped = false
        this.power = 400
        this.armour = 0
        this.resist = 20
        this.life = 20
        this.max_life = 20
        this.physical_damage = 0
        this.magic_damage = 2
        this.evade = 10
        this.caster = false
        this.piercing_damage_resist = 2
        this.init()
    }

    turn(enemies, player){
        let target = this.getTarget(player)
       
        Functions.createModal(this, 'attack!')
        target.takeDamage(this)

        if(Math.random() >= 0.8){
            target.newStatus(new Poison(2, 3), this)
        }
    }
}