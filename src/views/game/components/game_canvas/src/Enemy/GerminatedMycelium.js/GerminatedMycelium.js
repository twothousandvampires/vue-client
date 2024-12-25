import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import GerminatedMyceliumSprite from "./GerminatedMyceliumSprite";
import ChokingSpores from "../../Status/ChokingSpores";
import Functions from "../../GameFunctions";

export default class GerminatedMycelium extends Enemy{
    constructor(context, x, y) {
        super(context, x, y);
        this.name = 'germinated mycelium'
        this.speed = 100
        this.size_x = 100
        this.size_y = 100
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite = new GerminatedMyceliumSprite(this)
        this.fliped = false
        this.power = 100
        this.armour = 0
        this.resist = 0
        this.life = 4
        this.max_life = 4
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
             player.newStatus(new ChokingSpores(1, 3), this)
             Functions.createModal(this, 'choking spores...')
           }
           else{
             Functions.createModal(this, 'the hat is shaking...')
           }
        }

        await this.afterTurn()
    }
}