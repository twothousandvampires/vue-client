import Functions from "../GameFunctions";
import EffectCreator from "../Effects/EffectCreator";
import Skull from './Skull'
import MeleeBehavior from "./behaviors/MeleeBehavior";
import UnitData from "../UnitData";
import Unit from "../scr/Unit";
import Sprite from "../scr/Sprite";
import Size from "../scr/Size";
import Box from "../scr/Box";
import Point from "../scr/Point";

export default class SkeletonWarrior extends Unit{
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite(96, 96, 'skeleton warrior')
        this.size = new Size(96, 96)
        this.box = new Box(40, 20)
        this.name = 'skeleton'
        this.skull_will_spawned = Math.random() > 0.5
        this.state = undefined

        this.stats = UnitData.get(this.name)
        this.behavior = new MeleeBehavior(this)
    }

    setState(state){
        this.sprite.frame = 0
        this.behavior.behavior_timer = 0
        switch (state){
            case 'idle':
                if(Math.random() < 0.5){
                    this.state = 'idle'
                    this.sprite.y_frame_offset = 0
                    this.sprite.max_frame = Math.random() < 0.5 ? 8 : 0
                    this.sprite.frame_change_tick = 6
                }
                else {
                    this.move_angle = Functions.random(6.24)
                    this.state = 'move'
                    this.sprite.y_frame_offset = 96
                    this.sprite.max_frame = 8
                    this.sprite.frame_change_tick = 4
                }
                break;
            case 'move':
                this.state = 'move'
                this.sprite.y_frame_offset = 96
                this.sprite.max_frame = 8
                this.sprite.frame_change_tick = 4
                break;
            case 'attack':
                this.state = 'attack'
                this.sprite.y_frame_offset = 192
                this.sprite.max_frame = 7
                this.sprite.frame_change_tick = Math.floor((this.getStat('attack_speed')/7)/50)
                break;
            case 'dying':
                this.state = 'dying'
                this.sprite.y_frame_offset = 192 + 96
                this.sprite.max_frame = 7
                this.sprite.frame_change_tick = 3
                break;
            case 'resurrect':
                this.state = 'resurrect'
                this.sprite.frame = 7
                this.sprite.y_frame_offset = 192 + 96
                this.sprite.max_frame = 0
                this.sprite.frame_change_tick = 3
                break;
            case 'dead':
                this.state = 'dead'
                this.sprite.frame = this.skull_will_spawned ? 8 : 7
                this.sprite.y_frame_offset = 192 + 96
                this.sprite.max_frame = 1
                this.sprite.frame_change_tick = 10
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

        this.behavior.behavior_timer ++
        this.sprite.frame_timer ++

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
            case 'dead':
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

    getAttackRadius(){
       return {
            point: new Point(this.x, this.y),
            radius: this.stats.getStat('attack_range')
        }
    }

    playerInAttackRadius(player){
        return  Functions.circleRectCollision(this.getAttackRadius(), player.getBoxRect())
    }

    attack(fight_context){
        let player = fight_context.player

        if(!this.deal_hit && this.sprite.frame === 6 && this.playerInAttackRadius(player)){
            this.deal_hit = true
            player.takeDamage(this.getDamage())
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
        let player = fight_context.player

        if(this.move_angle){
            this.behavior_timer ++
            if(this.behavior_timer >= 20){
                this.move_angle = undefined
                this.setState(this.behavior.getState(fight_context))
                return
            }
        }
        else {
            if(this.playerInAttackRadius(player)){
                this.setState('attack')
                return
            }

        }
        let angle = Functions.angle(this.point, player.point)
        let move_x = Math.sin(angle)
        this.fliped = move_x <= 0;
        let move_y = Math.cos(angle)
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
                if(this.skull_will_spawned){
                    fight_context.enemy.push((new Skull(this.cord_x, this.cord_y)))
                }
                this.setState('dead')
            }
        }
    }
    dead(fight_context){

    }

    takeDamage(){
        this.setState('dying')
    }
}