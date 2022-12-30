import UnitData from "../UnitData";
import Functions from "../GameFunctions";
import Skull from "./Skull";
import TotemBehavior from "./behaviors/TotemBehavior";
import Unit from "../scr/Unit";

export default class PileOfSkull extends Unit {
    constructor(x, y) {
        super(x, y)
        this.name = 'pile of skull'
        this.img_name = 'pile_of_skull'
        this.state = undefined
        this.behavior_timer = 0
        this.move_angle = undefined
        this.stats = UnitData.get(this.name)
        this.size_x = 80
        this.size_y = 80
        this.box_size_x = 40
        this.box_size_y = 20
        this.sprite_w = 96
        this.sprite_h = 96
        this.behavior = new TotemBehavior(this)
        this.action_cd = true
        setTimeout(()=> {
            this.action_cd = false
        }, 3000)
    }

    setState(state){
        this.frame = 0
        this.behavior_timer = 0
        switch (state){
            case 'idle':
                let r = Math.floor(Math.random() * 3)
                this.state = 'idle'
                this.frame_change_tick = 6
                if(r == 0){
                    this.max_frame = 16
                    this.y_frame_offset = 0
                }
                else if(r == 1){
                    this.max_frame = 14
                    this.y_frame_offset = 96
                }
                else{
                    this.max_frame = 13
                    this.y_frame_offset = 192
                }
                break;
            case 'cast':
                this.state = 'cast'
                this.y_frame_offset = 192 + 96
                this.max_frame = 14
                this.frame_change_tick = Math.floor((this.getStat('cast_speed')/14)/50)
                break;
            case 'dying':
                this.state = 'dying'
                this.y_frame_offset = 192 + 192
                this.max_frame = 6
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
            case 'cast':
                this.cast(fight_context)
                break;
            case 'dying':
                this.dying(fight_context)
                break;
        }
    }

    damage(angle){

    }

    idle(fight_context){
        if(this.frame_timer >= this.frame_change_tick) {
            this.frame_timer = 0
            this.frame++
            if (this.frame >= this.max_frame) {
                this.setState(this.behavior.getState(fight_context))
            }
        }
    }

    cast(fight_context){
        if(this.frame_timer >= this.frame_change_tick) {
            this.frame_timer = 0
            this.frame++
            if (this.frame >= this.max_frame) {
                this.action_cd = true
                fight_context.enemy.push(new Skull(this.cord_x + 50, this.cord_y + 50))
                this.setState(this.behavior.getState(fight_context))
                setTimeout(()=> {
                    this.action_cd = false
                }, 3000)
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

    dying(fight_context){
        if(this.frame_timer >= this.frame_change_tick) {
            this.frame_timer = 0
            this.frame++
            if (this.frame >= this.max_frame) {
                this.frame = this.max_frame - 1
            }
        }
    }

    takeDamage(){
        this.setState('dying')
    }
}