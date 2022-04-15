import GameObject from "./GameObject";

export default class Unit extends GameObject{

    constructor(x, y) {
        super(x, y);
        this.can_move = true
        this.frozen = false
        this.stunned = false
        this.damaged = false
        this.is_idle = true
        this.is_move = false
        this.is_attack = false
        this.deal_hit = false
        this.is_dead = false
    }

    getState(){
        if(this.is_idle){
            return 'idle'
        }
        if(this.is_move){
            return 'move'
        }
        if(this.is_attack){
            return 'attack'
        }
        if(this.damaged){
            return 'damage'
        }
        if(this.is_idle_move){
            return 'idle move'
        }
        if(this.is_dead){
            return 'dead'
        }
        return 'yo';
    }

    angleToAttackRect(angle){
        return {
            cord_x : this.cord_x + Math.sin(angle) * this.attack_range/2,
            cord_y : this.cord_y + Math.cos(angle) * this.attack_range/2,
            box_size_x : this.attack_range,
            box_size_y : this.attack_range,
            angle : angle
        }
    }

    setSize(x, y){
        this.size_x = x
        this.size_y = y
        this.sprite_w = x
        this.sprite_h = y
    }
}