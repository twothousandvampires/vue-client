import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import WildMyceliumSprite from "./WildMyceliumSprite";
import MentalBreakingSpores from "../../Status/MentalBreakingSpores";
import CorrosiveSpores from "../../Status/CorrosiveSpores";
import DisintegratingSpores from "../../Status/DisintegratingSpores";
import Functions from "../../GameFunctions";

export default class WildMycelium extends Enemy{
    constructor(context, x, y) {
        super(context, x, y);
        this.name = 'towering mycelium'
        this.speed = 100
        this.size_x = 150
        this.size_y = 150
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite = new WildMyceliumSprite(this)
        this.fliped = false
        this.power = 1000
        this.armour = 10
        this.resist = 0
        this.life = 60
        this.max_life = 60
        this.physical_damage = 0
        this.magic_damage = 0
        this.evade = 0
        this.caster = false
        this.cutting_damage_resist = 2
        this.lightning_damage_resist = 2
        this.init()
    }

    async startTurn(enemies, player) {
        this.updateStatusNewTurn()

        if(this.availableToTurn()){
           if(Math.random() >= 0.5){
             let r =  Math.random()
             if(r < 0.33){
                player.newStatus(new MentalBreakingSpores(3, 2), this)
             }
             else if(r < 0.66){
                player.newStatus(new CorrosiveSpores(2, 3), this)
             }
             else{
                player.newStatus(new DisintegratingSpores(4, 3), this)
             }
             Functions.createModal(this, 'spores are dropping...')
           }
           else{
             Functions.createModal(this, 'the hats are shaking...')
           }
        }

        await this.afterTurn()
    }
}