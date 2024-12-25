import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import LostDaylightSprite from "./LostDaylightSprite";
import Functions from "../../GameFunctions";
import Blind from "../../Status/Blind";
import Unit from "../../Scr/Unit";

export default class LostDaylight extends Enemy{
    constructor(context, x, y) {
        super(context, x, y);
        this.name = 'lost daylight'
        this.speed = 400
        this.size_x = 100
        this.size_y = 100
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite = new LostDaylightSprite(this)
        this.fliped = false
        this.power = 400
        this.armour = 0
        this.resist = 0
        this.life = 1
        this.max_life = 1
        this.physical_damage = 0
        this.magic_damage = 0
        this.evade = 0
        this.caster = false
        this.piercing_damage_resist = 0
        this.cutting_damage_resist = 0
        this.crushing_damage_resist = 0
        this.physical_damage_resist = 0
        this.initiative = 12
        this.init()
    }

    async startTurn() {
        if(this.availableToTurn()){
            Functions.createModal(this, 'puts out lights')
        }

        await this.afterTurn()
    }

    setDyingState(){
        this.figth_context.player.newStatus(new Blind(50, 1), this)
        this.figth_context.deleteFromQueue(this)
        this.dead = true
        this.state =  Unit.STATE_DYING
        this.resetState()
        this.stateAct = this.dyingAct
    }
}