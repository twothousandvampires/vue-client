import Functions from "../GameFunctions";
import Arrow from "../projectiles/Arrow";
import UnitData from "../UnitData";
import ArcherBehavior from "./behaviors/ArcherBehavior";
import Skull from "./Skull";
import Unit from "../scr/Unit";
export default class SkeletonArcher extends Unit{

    constructor(x, y) {
        super(x, y);
        this.size_x = 96
        this.size_y = 96
        this.skull_will_spawned = Math.random() > 0.5
        this.skull_was_spawned = false
        this.box_size_x = 50
        this.box_size_y = 25
        this.sprite_w = 96
        this.sprite_h = 96
        this.name =  'skeleton archer'
        this.img_name = 'skeleton archer'
        this.stats = UnitData.get(this.name)
        this.behavior = new ArcherBehavior(this)
        this.move_angle = undefined
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
                    this.y_frame_offset = 96
                    this.max_frame = 5
                    this.frame_change_tick = 5
                }
                break;
            case 'move':
                this.state = 'move'
                this.y_frame_offset = 96
                this.max_frame = 5
                this.frame_change_tick = 5
                break;
            case 'range attack':
                this.state = 'attack'
                this.y_frame_offset = 192
                this.max_frame = 7
                this.frame_change_tick = Math.floor((this.getStat('attack_speed')/7)/50)
                break;
            case 'dying':
                this.state = 'dying'
                this.y_frame_offset = 192 + 96
                this.max_frame = this.skull_will_spawned ? 9 : 8
                this.frame_change_tick = 3
                break;
            case 'resurrect':
                this.frame = 8
                this.state = 'resurrect'
                this.y_frame_offset = 192 + 96
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
        if(this.frame === 6 && !this.deal_hit){
            fight_context.projectiles.push(new Arrow(this.cord_x, this.cord_y, Functions.angle(this, fight_context.player)))
            this.deal_hit = true
        }
        if(this.frame_timer >= this.frame_change_tick){
            this.frame_timer = 0
            this.frame ++
            if(this.frame >= this.max_frame){
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
        let move_x = Math.sin(this.move_angle)
        this.fliped = move_x <= 0;
        let move_y = Math.cos(this.move_angle)
        this.setCord(move_x, move_y, fight_context)
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