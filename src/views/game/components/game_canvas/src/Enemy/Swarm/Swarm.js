import Enemy from "@/views/game/components/game_canvas/src/Enemy/src/Enemy";
import SwarmSprite from "./SwarmSprite";
import Unit from "../../Scr/Unit";

export default class Swarm extends Enemy{
    constructor(context, x, y) {
        super(context, x, y);
        this.name = 'swarm'
        this.speed = 900
        this.size_x = 100
        this.size_y = 100
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite = new SwarmSprite(this)
        this.fliped = false
        this.power = 70
        this.armour = 0
        this.resist = 0
        this.life = 1
        this.max_life = 1
        this.physical_damage = 1
        this.magic_damage = 0
        this.evade = 80
        this.caster = false
        this.initiative = 9
        this.init()
    }

    deadAct() {
        if(this.fight_context.turn_count >= this.dead_turn + 3){
            this.life = this.max_life
            this.dead = 0
            this.fight_context.turn_queue.push(this)
            this.idleState()
        }
    }
    
    deadState(){
        this.dead_turn = this.fight_context.turn_count
        this.state = Unit.STATE_DEAD
        this.resetState()
        this.stateAct = this.deadAct
    }
}