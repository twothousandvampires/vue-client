import GhostGrip from "../skills/GhostGrip";
import SoulVortex from "../skills/SoulVortex";
import Teleport from "../skills/Teleport";
import Skull from "../skull/Skull";
import Undead from "../src/Undead";
import GhostSprite from "./sprite/GhostSprite";

export default class Ghost extends Undead {
    constructor(context, x, y) {
        super(context, x, y)
        this.name = 'ghost'
        this.skull_will_spawned = true
        this.state = undefined
        this.skills = [
            new GhostGrip(this),
            new SoulVortex(this),
            new Teleport(this)
        ]
        this.sprite = new GhostSprite(this)
        this.behavior_timer = 0

        this.box_size_x =40
        this.box_size_y =20
        this.size_x = 80
        this.size_y = 80
        this.casted_spell = undefined
        this.life = 12
        this.max_life = 12
        this.movement_speed = 1.8
        this.attack_speed = 0
        this.attack_range = 0
        this.looking_range = 250
        this.cast_speed = 2000

        this.phased = true
        this.inmaterial = true

        this.init()
    }

    dyingAct(){
        if(this.sprite.sprite_end){
            if(this.skull_will_spawned){
                this.figth_context.enemy.push(new Skull(this.figth_context, this.point.x, this.point.y))
            }
            this.deadState()
        }
    }

    castAct(){
        let player = this.figth_context.player

        if(!this.deal_hit && this.sprite.frame === 7){
            this.deal_hit = true
            this.casted_spell.cast()
        }
        if(this.sprite.sprite_end){
            this.getState()
        }
    }

    getState(){
        let available_spells_to_cast = this.skills.filter(elem => elem.canCast())

        if(available_spells_to_cast.length){
            this.castState()
            this.casted_spell = available_spells_to_cast[Math.floor(Math.random() * available_spells_to_cast.length)]
        }
        else {
            if( Math.random() > 0.5){
                let angle = Math.random() * 6.24
                this.moveState(angle)
            }
            else {
                this.idleState()
            }
        }
    }

    getDamage(){
        return  {
            'type': 'physical',
            'value': 10,
            'force': true,
            'source': this
        }
    }
}