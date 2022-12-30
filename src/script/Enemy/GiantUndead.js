import UnitData from "../UnitData";
import MeleeBehavior from "./behaviors/MeleeBehavior";
import Functions from "../GameFunctions";
import Skull from "./Skull";
import Unit from "../scr/Unit";

export default class GiantUndead extends Unit{
    constructor(x, y) {
        super(x, y)
        this.name = 'giant undead'
        this.skull_will_spawned = Math.random() > 0.5
        this.skull_was_spawned = false
        this.img_name = 'giant undead'
        this.y_frame_offset = 0
        this.state = undefined
        this.behavior_timer = 0
        this.move_angle = undefined
        this.stats = UnitData.get(this.name)
        this.size_x = 144
        this.size_y = 144
        this.box_size_x = 60
        this.box_size_y = 25
        this.sprite_w = 108
        this.sprite_h = 108
        this.behavior = new MeleeBehavior(this)
    }

    setState(state){
        this.frame = 0
        this.behavior_timer = 0
        switch (state){
            case 'idle':
                if(Math.random() < 0.5){
                    this.state = 'idle'
                    this.y_frame_offset = 0
                    this.max_frame = Math.random() < 0.5 ? 9 : 0
                    this.frame_change_tick = 6
                }
                else {
                    this.move_angle = Math.random() * 6.24
                    this.state = 'move'
                    this.y_frame_offset = 108
                    this.max_frame = 8
                    this.frame_change_tick = 5
                }
                break;
            case 'move':
                this.state = 'move'
                this.y_frame_offset = 108
                this.max_frame = 8
                this.frame_change_tick = 5
                break;
            case 'attack':
                this.state = 'attack'
                this.y_frame_offset = 216
                this.max_frame = 12
                this.frame_change_tick = Math.floor((this.getStat('attack_speed')/7)/50)
                break;
            case 'dying':
                this.state = 'dying'
                this.y_frame_offset = 324
                this.max_frame = this.skull_will_spawned ? 7 : 6
                this.frame_change_tick = 4
                break;
            case 'resurrect':
                this.frame = 6
                this.state = 'resurrect'
                this.y_frame_offset = 324
                this.max_frame = 0
                this.frame_change_tick = 4
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
            case 'attack':
                this.attack(fight_context)
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
        if(this.frame_timer >= this.frame_change_tick){
            this.frame_timer = 0
            this.frame ++
            if(this.frame >= this.max_frame){
                this.frame = 0
            }
        }
    }

    attack(fight_context){
        let distance_to_char = Functions.distance(this, fight_context.player)
        if(this.frame === 6 && !this.deal_hit && distance_to_char < this.getStat('attack_range')){
            this.deal_hit = true
            fight_context.player.takeDamage(this.getDamage())
            this.frame_change_tick /= 3
        }
        if(this.frame_timer >= this.frame_change_tick){
            this.frame_timer = 0
            this.frame ++
            if(this.frame >= this.max_frame){
                if(this.state == 'attack'){
                    this.setState('idle')
                    this.deal_hit = false
                }
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

    resurrect(fight_context){
        if(this.frame_timer >= this.frame_change_tick){
            this.frame_timer = 0
            this.frame --
            if(this.frame <= this.max_frame){
                this.setState('idle')
            }
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
            let player = fight_context.player
            let distance_to_player = Functions.distance(this, player)
            if(distance_to_player < this.getStat('attack_range')){
                this.setState(this.behavior.getState(fight_context))
                return
            }
            this.move_angle = Functions.angle(this, player)
        }
        let move_x = Math.sin(this.move_angle)
        this.fliped = move_x <= 0;
        let move_y = Math.cos(this.move_angle)
        this.setCord(move_x, move_y, fight_context)
        this.move_angle = undefined
        if(this.frame_timer >= this.frame_change_tick){
            this.frame_timer = 0
            this.frame ++
            if(this.frame >= this.max_frame){
                this.frame = 0
            }
        }
    }

    dying(fight_context){
        if(this.frame_timer >= this.frame_change_tick){
            this.frame_timer = 0
            this.frame ++
            if(this.frame >= this.max_frame){
                if(this.skull_will_spawned && !this.skull_was_spawned){
                    fight_context.enemy.push((new Skull(this.cord_x, this.cord_y)))
                    this.skull_was_spawned = true
                }
                this.frame = this.max_frame - 1
            }
        }
    }

    takeDamage(){
        this.setState('dying')
    }
}