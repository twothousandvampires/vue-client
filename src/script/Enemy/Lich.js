import CasterBehavior from "./behaviors/CasterBehavior";
import UnitData from "../UnitData";
import ArmyOfTheDeadCast from "./skills/ArmyOfTheDeadCast";
import Unit from "../scr/Unit";

export default class Lich extends Unit{

    constructor(x, y) {
        super(x, y);
        this.name = 'lich'
        this.img_name = 'lich'
        this.skull_will_spawned = false
        this.skull_was_spawned = false
        this.y_frame_offset = 0
        this.behavior = new CasterBehavior(this)
        this.skills = [
            new ArmyOfTheDeadCast(this)
        ]
        this.stats = UnitData.get(this.name)
        this.size_x = 108 + 36
        this.size_y = 108 + 36
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite_w = 108
        this.sprite_h = 108
    }

    canResurect(){
        return false
    }
    setState(state){
        this.frame = 0
        this.behavior_timer = 0
        switch (state){
            case 'idle':
                this.state = 'idle'
                this.y_frame_offset = 0
                this.max_frame = 8
                this.frame_change_tick = 4
                break;
            case 'move':
                this.state = 'move'
                this.y_frame_offset = 108
                this.max_frame = 8
                this.frame_change_tick = 4
                break;
            case 'cast':
                this.state = 'cast'
                this.y_frame_offset = 216
                this.max_frame = 15
                this.frame_change_tick = Math.floor((this.getStat('cast_speed')/12)/50)
                break;
            case 'dying':
                this.state = 'dying'
                this.y_frame_offset = 108 + 216
                this.max_frame = 9
                this.frame_change_tick = 2
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
        }
    }

    dying(fight_context){
        if(this.frame_timer >= this.frame_change_tick){
            this.frame_timer = 0
            this.frame ++
            if(this.frame >= this.max_frame){
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
        if(this.frame >= 12 && !this.casted){
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
            console.log("!!!")
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
}