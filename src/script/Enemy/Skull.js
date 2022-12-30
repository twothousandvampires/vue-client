import Functions from "../GameFunctions";
import MeleeBehavior from "./behaviors/MeleeBehavior";
import UnitData from "../UnitData";
import Unit from "../scr/Unit";

export default class SkeletonWarrior extends Unit{
    constructor(x, y) {
        super(x, y)
        this.name = 'skull'
        this.img_name = 'skull'
        this.state = undefined

        this.behavior_timer = 0
        this.move_angle = undefined
        this.stats = UnitData.get(this.name)
        this.size_x = 60
        this.size_y = 60
        this.box_size_x = 10
        this.box_size_y = 7
        this.sprite_w = 45
        this.sprite_h = 45
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
                    this.max_frame = Math.random() < 0.5 ? 5 : 0
                    this.frame_change_tick = 3
                }
                else {
                    this.move_angle = Math.random() * 6.24
                    this.state = 'move'
                    this.y_frame_offset = 45
                    this.max_frame = 6
                    this.frame_change_tick = 3
                }
                break;
            case 'move':
                this.state = 'move'
                this.y_frame_offset = 45
                this.max_frame = 6
                this.frame_change_tick = 3
                break;
            case 'attack':
                this.state = 'attack'
                this.y_frame_offset = 90
                this.max_frame = 9
                this.frame_change_tick = Math.floor((this.getStat('attack_speed')/7)/50)
                break;
            case 'dying':
                this.state = 'dying'
                this.y_frame_offset = 135
                this.max_frame = 5
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
        }
        this.behavior_timer ++
        // let distance_to_char = Functions.distance(this, char)
        // if(this.is_resurected){
        //
        // }
        // if(this.is_dead){
        //
        // }
        // else if(this.can_change_behavior){
        //
        //     if(distance_to_char < 50 && !this.wait_between_attack){
        //         this.attack(char)
        //     }
        //     else if(distance_to_char >= 50 && distance_to_char < 300){
        //         this.move()
        //     }
        //     else if(distance_to_char > 200 && distance_to_char < 400 && this.can_charge){
        //         this.deriction_angle = Functions.angle(this, char)
        //         this.charge()
        //     }
        //     else if(distance_to_char >= 300 && distance_to_char < 400){
        //         this.move()
        //     }
        //     else {
        //         this.deriction_angle = Math.random() * 6.14
        //         this.idleMove()
        //     }
        //     this.can_change_behavior = false
        // }
        //
        // else if(this.frozen || this.stunned){
        //
        // }
        // else if(this.damaged){
        //     let move_x = Math.sin(this.direction_angle)
        //     let move_y = Math.cos(this.direction_angle)
        //     this.setCord(move_x, move_y, fight.map)
        // }
        // else if(this.is_attack){
        //     if(!this.deal_hit && this.frame === 4){
        //         this.deal_hit = true
        //         fight.effects.push(EffectCreator.createEffect('weapon swing', this.attack_box.cord_x, this.attack_box.cord_y, this.attack_box.box_size_x, this.attack_box.box_size_y, this.attack_box.angle))
        //         if(Functions.rectCollision(this.attack_box, char) && !char.damaged){
        //             char.damage(Functions.angle(this, char))
        //         }
        //     }
        // }
        // else if(this.is_move){
        //     if(distance_to_char < 50){
        //         this.attack(char)
        //     }
        //     else {
        //         this.move_angle = Functions.angle(this, char)
        //         let move_x = Math.sin(this.move_angle)
        //         this.fliped = move_x <= 0;
        //         let move_y = Math.cos(this.move_angle)
        //         this.setCord(move_x, move_y, fight.map)
        //     }
        // }
        // else if(this.is_charge){
        //     let move_x = Math.sin(this.deriction_angle)
        //     this.fliped = move_x <= 0;
        //     let move_y = Math.cos(this.deriction_angle)
        //     this.setCord(move_x, move_y, fight.map)
        // }
        // else if(this.is_idle_move){
        //     let move_x = Math.sin(this.deriction_angle)
        //     this.fliped = move_x <= 0;
        //     let move_y = Math.cos(this.deriction_angle)
        //     this.setCord(move_x, move_y, fight.map)
        // }

        this.frame_timer ++
        if(this.frame_timer >= this.frame_change_tick){
            this.frame_timer = 0
            // if(this.is_resurected){
            //     this.frame --
            //     if(this.frame < 0){
            //         this.is_dead = false
            //         this.skull_spawned = Math.random() > 0.5
            //         this.idle(1000)
            //     }
            // }
            this.frame ++
            if(this.frame >= this.max_frame){
                // if(this.is_dead){
                //     if(this.skull_spawned && !this.skull_was_spawn){
                //         fight.enemy.push(new SkeletonSkull(this.cord_x, this.cord_y))
                //         this.skull_was_spawn = true
                //     }
                //     this.frame = this.max_frame - 1
                // }
                if(this.state == 'attack'){
                    this.setState('idle')
                    this.deal_hit = false
                    return
                }
                if(this.state == 'dying'){
                    this.frame = this.max_frame - 1
                }
                else {
                    this.frame = 0
                }
            }
        }
    }

    damage(angle){

    }

    idle(fight_context){
        if(this.behavior_timer > 50){
            this.setState(this.behavior.getState(fight_context))
        }
    }

    attack(fight_context){
        let distance_to_char = Functions.distance(this, fight_context.player)
        if(this.frame === 6 && !this.deal_hit && distance_to_char < this.getStat('attack_range')){
            this.deal_hit = true
            fight_context.player.takeDamage(this.getDamage())
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
    }

    dying(){

    }

    takeDamage(){
        this.setState('dying')
    }
}