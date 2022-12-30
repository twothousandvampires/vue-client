import FearSkull from "./skills/FearSkull";
import CasterBehavior from "./behaviors/CasterBehavior";
import UnitData from "../UnitData";
import Skull from "./Skull";
import RaiseTheUndeadCast from "./skills/RaiseTheUndeadCast";
import Unit from "../scr/Unit";

export default class SkeletonWizard extends Unit{

    constructor(x, y) {
        super(x, y);
        this.name = 'skeleton wizard'
        this.img_name = 'skeleton wizard'
        this.skull_will_spawned = Math.random() > 0.5
        this.skull_was_spawned = false
        this.y_frame_offset = 0
        this.cast_speed = 1800
        this.max_frame = 7
        this.frame_change_tick = 7
        this.behavior = new CasterBehavior(this)
        this.skills = [
            new FearSkull(this),
            new RaiseTheUndeadCast(this)
        ]
        this.stats = UnitData.get(this.name)
        this.size_x = 96,
        this.size_y = 96
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite_w = 96
        this.sprite_h = 96
    }


    setState(state){
        this.frame = 0
        this.behavior_timer = 0
        switch (state){
            case 'idle':
                if(Math.random() < 0.5){
                    this.state = 'idle'
                    this.y_frame_offset = 0
                    this.max_frame = Math.random() < 0.5 ? 12 : 0
                    this.frame_change_tick = 6
                }
                else {
                    this.state = 'move'
                    this.y_frame_offset = 96
                    this.max_frame = 6
                    this.frame_change_tick = 4
                }
                break;
            case 'move':
                this.state = 'move'
                this.y_frame_offset = 96
                this.max_frame = 6
                this.frame_change_tick = 2
                break;
            case 'cast':
                this.state = 'cast'
                this.y_frame_offset = 192
                this.max_frame = 12
                this.frame_change_tick = Math.floor((this.getStat('cast_speed')/12)/50)
                break;
            case 'dying':
                this.state = 'dying'
                this.y_frame_offset = 192 + 96
                this.max_frame = this.skull_will_spawned ? 11 : 10
                this.frame_change_tick = 3
                break;
            case 'resurrect':
                this.frame = 10
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

    dying(fight_context){
        if(this.frame_timer >= this.frame_change_tick){
            this.frame_timer = 0
            this.frame ++
            if(this.frame >= this.max_frame){
                if (this.skull_will_spawned && !this.skull_was_spawned) {
                    fight_context.enemy.push((new Skull(this.cord_x, this.cord_y)))
                    this.skull_was_spawned = true
                }
                this.frame = this.max_frame - 1
            }
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

    cast(fight_context){
        if(this.frame >=9 && !this.casted){
            this.casted = true
            this.casted_skill.cast(fight_context)
        }
        if(this.frame_timer >= this.frame_change_tick){
            this.frame_timer = 0
            this.frame ++
            if(this.frame >= this.max_frame){
                this.setState('idle')
                this.casted = false
                this.deal_hit = false
            }
        }
    }

    move(fight_context){
        if(this.behavior_timer > 50){
            this.setState(this.behavior.getState(fight_context))
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
    takeDamage(){
        this.setState('dying')
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

}