import UnitData from "../UnitData";
import CasterBehavior from "./behaviors/CasterBehavior";
import Functions from "../GameFunctions";
import GhostGripCast from "./skills/GhostGripCast";
import SoulVortexCast from "./skills/SoulVortexCast";
import TeleportCast from "./skills/TeleportCast";
import Skull from "./Skull";
import Undead from "./src/Undead";
import Size from "../scr/Size";
import Box from "../scr/Box";
import Sprite from "../scr/Sprite"

export default class Ghost extends Undead {
    constructor(x, y) {
        super(x, y)
        this.name = 'ghost'
        this.skull_will_spawned = Math.random() > 0.5
        this.skull_was_spawned = false
        this.img_name = 'ghost'
        this.state = undefined
        this.skills = [
            new GhostGripCast(this),
            new SoulVortexCast(this),
            new TeleportCast(this)
        ]
        this.behavior_timer = 0
        this.stats = UnitData.get(this.name)
        this.size = new Size(80, 80)
        this.box = new Box(40, 20)
        this.sprite = new Sprite(80, 80)

        this.behavior = new CasterBehavior(this)

        this.phased = true
        this.inmaterial = true
    }

    setState(state){
        this.frame = 0
        this.behavior_timer = 0
        switch (state){
            case 'idle':
                if(Math.random() < 0.5){
                    this.state = 'idle'
                    this.y_frame_offset = 0
                    this.max_frame = Math.random() < 0.5 ? 8 : 0
                    this.frame_change_tick = 6
                }
                else {
                    this.move_angle = Math.random() * 6.24
                    this.state = 'move'
                    this.y_frame_offset = 80
                    this.max_frame = 7
                    this.frame_change_tick = 4
                }
                break;
            case 'move':
                this.state = 'move'
                this.y_frame_offset = 80
                this.max_frame = 7
                this.frame_change_tick = 4
                break;
            case 'cast':
                this.state = 'cast'
                this.y_frame_offset = 160
                this.max_frame = 10
                this.frame_change_tick = Math.floor((this.getStat('cast_speed')/7)/50)
                break;
            case 'dying':
                this.state = 'dying'
                this.y_frame_offset = 240
                this.max_frame = this.skull_will_spawned ? 8 : 7
                this.frame_change_tick = 3
                break;
            case 'resurrect':
                this.frame = 7
                this.state = 'resurrect'
                this.y_frame_offset = 240
                this.max_frame = 0
                this.frame_change_tick = 3
                break;
        }
    }

    act(fight_context){
        if(!this.state){
            this.setState(this.behavior.getState(fight_context))
        }
        this.status.pull.forEach(elem => {
            elem.act(fight_context)
        })

        this.behavior_timer ++
        this.frame_timer ++

        switch (this.state){
            case 'idle':
                this.idle(fight_context)
                break;
            case 'move':
                this.move(fight_context)
                break;
            case 'cast':
                this.cast(fight_context)
                break;
            case 'dying':
                this.dying(fight_context)
                break;
            case 'resurrect':
                this.resurrect(fight_context)
                break;
        }
    }

    damage(angle){

    }

    idle(fight_context){
        if(this.behavior_timer > 50){
            this.setState(this.behavior.getState(fight_context))
        }
        if(this.frame_timer >= this.frame_change_tick) {
            this.frame_timer = 0
            this.frame++
            if (this.frame >= this.max_frame) {
                this.frame = 0
            }
        }
    }

    cast(fight_context){
        if(this.frame >=7 && !this.casted){
            this.casted = true
            this.casted_skill.cast(fight_context)
        }
        if(this.frame_timer >= this.frame_change_tick) {
            this.frame_timer = 0
            this.frame++
            if (this.frame >= this.max_frame) {
                this.casted = false
                this.setState('idle')
                this.deal_hit = false
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

    move(fight_context){
        if(this.move_angle){
            this.behavior_timer ++
            if(this.behavior_timer >= 20){
                this.setState(this.behavior.getState(fight_context))
                return
            }
        }
        else {
            this.move_angle = Functions.angle(this, player)
        }
        let move_x = Math.sin(this.move_angle)
        this.fliped = move_x <= 0;
        let move_y = Math.cos(this.move_angle)
        this.setCord(move_x, move_y, fight_context)
        if(this.frame_timer >= this.frame_change_tick) {
            this.frame_timer = 0
            this.frame++
            if (this.frame >= this.max_frame) {
                this.frame = 0
            }
        }
    }

    dying(fight_context){
        if(this.frame_timer >= this.frame_change_tick) {
            this.frame_timer = 0
            this.frame++
            if (this.frame >= this.max_frame) {
                if (this.skull_will_spawned && !this.skull_was_spawned) {
                    fight_context.enemy.push((new Skull(this.cord_x, this.cord_y)))
                    this.skull_was_spawned = true
                }
                this.frame = this.max_frame - 1
            }
        }
    }

    resurrect(fight_context){
        if(this.frame_timer >= this.frame_change_tick){
            this.frame_timer = 0
            this.frame --
            if(this.frame <= this.max_frame){
                this.setState('idle')
            }
        }
    }

    takeDamage(){
        this.setState('dying')
    }
}