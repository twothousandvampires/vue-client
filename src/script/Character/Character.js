import Functions from "../GameFunctions";
import Inventory from "./Inventory";
import Unit from "../scr/Unit";
import EffectCreator from "../Effects/EffectCreator";
import Modal from "../Modal.js";

export default class Character extends Unit{

    constructor(x, y, template, items = false) {
        super(x, y)
        console.log(Modal.PARRENT)
        this.template = template
        if (items) {
            this.inv = new Inventory(items,this)
        }

        this.img_name = 'grim traveler'
        this.parseStats(template)
        //ms
        this.attack_speed = 1200
        this.attack_range = 60

        this.attack_box = undefined

        // size on canvas
        this.size_x = 90
        this.size_y = 93

        // sprite size
        this.sprite_w = 90
        this.sprite_h = 93

        // coll box size
        this.box_size_x = 46
        this.box_size_y = 30

        this.def_w = this.sprite_w
        this.def_h = this.sprite_h

        this.recovery_timeout = undefined

        this.y_frame_offset = 0
        this.max_frame = 9
        this.frame_change_tick = 7 // 7 * 50(game_tick) = 350 ms

        this.is_cast = false
        this.is_poution = false
        this.is_scroll = false
        this.is_run = false
        this.defended = false

        this.speed = 2
        this.calcStats()
        console.log(this.getStat('spell_crit_chance'))
        console.log(this.getStat('spell_crit_chance', true))
    }

    parseStats(template){
        for(let elem in template){
            this[elem] = template[elem]
        }
    }

    calcStats(){
        this.max_life = Functions.increasedByPercent(this.template.max_life, this.getIncreased('life'))
        this.life = Functions.increasedByPercent(this.template.life, this.getIncreased('life'))
        this.energy = Functions.increasedByPercent(this.template.energy, this.getIncreased('energy'))
        this.max_energy = Functions.increasedByPercent(this.template.max_energy, this.getIncreased('energy'))
    }

    getMinAttackDamage(){
        if(this.inv.weaponIsEquip()){
            return this.inv.getWeapon().min_damage + this.add_attack_damage * 0.5
        }
        else {
            return this.min_attack_damage + this.add_attack_damage * 0.5
        }
    }

    getMaxAttackDamage(){
        if(this.inv.weaponIsEquip()){
            return this.inv.getWeapon().max_damage + this.add_attack_damage * 1.5
        }
        else {
            return this.max_attack_damage + this.add_attack_damage * 1.5
        }
    }

    getTotalMinAttackDamage(){
        return Functions.increasedByPercent(this.getMinAttackDamage(), this.getIncreased('attack_damage'))
    }

    getTotalMaxAttackDamage(){
        return Functions.increasedByPercent(this.getMaxAttackDamage(), this.getIncreased('attack_damage'))
    }

    getAttackDamage(){
        return +((Math.random() * (this.getTotalMaxAttackDamage() - this.getTotalMinAttackDamage()) + this.getTotalMinAttackDamage()).toFixed(1))
    }

    getIncreased(stat){
        return this['increased_'+stat] - this['reduced_'+stat]
    }

    getStat(stat ,total = false){
        return total ? Functions.increasedByPercent(this[stat], this.getIncreased(stat)) : this[stat]
    }

    getState(){
        if(this.is_idle){
            return 'idle';
        }
        else if(this.is_attack){
            return 'attack'
        }
        else if(this.is_move){
            return 'move'
        }
        else if(this.is_run){
            return 'run'
        }
        else if(this.damaged){
            return 'damaged'
        }
        else if(this.defended){
            return 'defend'
        }
    }

    getMoveAngle(input){
        if(input.w){
            if(input.d){
                this.move_angle = 2.36
            }
            else if(input.a){
                this.move_angle = 3.93
            }
            else {
                this.move_angle = 3.14
            }
        }
        else if(input.s){
            if(input.d){
                this.move_angle = 0.76
            }
            else if(input.a){
                this.move_angle = 5.5
            }
            else {
                this.move_angle = 0
            }
        }
        else if(input.a){
            this.move_angle = 4.71
        }
        else if(input.d){
            this.move_angle = 1.57
        }
    }

    moveInputIsPressed(input){
        return input.w || input.s || input.a || input.d
    }

    resetFrame(){
        this.frame = 0
        this.frame_timer = 0
        this.is_move = false
        this.is_run = false
        this.is_attack = false
        this.is_poution = false
        this.is_scroll = false
        this.is_cast = false
        this.is_idle = false
        this.damaged = false
        this.defended = false
        this.attack_box = false
        this.deal_hit = false
    }

    setRecoveryTimeOut(ms){
        clearTimeout(this.recovery_timeout)
        this.recovery_timeout = setTimeout(()=>{
            this.idle()
        },ms)
    }

    regen(tick){
        if( (this.is_run ) && tick%10 === 0){
            this.energy -= 0.5
        }

        if(!this.is_run && !this.is_attack && tick%20 === 0 && this.energy < this.max_energy){
            this.energy += this.energy_regeneration
            if(this.energy > this.max_energy){
                this.energy = this.max_energy
            }
        }
    }

    act(mouse, effect, enemy, tick, text){
        this.regen(tick)

        let input = mouse.getInput()
        let mouse_cord = {cord_x: input.canvas_x, cord_y: input.canvas_y}

        if(this.frozen || this.stunned){
            //
        }
        else if(this.damaged){
            let move_x = Math.sin(this.direction_angle)
            let move_y = Math.cos(this.direction_angle)
            this.setCord(move_x, move_y)
        }
        else if(this.is_attack){
            if(!this.deal_hit && this.frame === 5){
                this.deal_hit = true
                let hit = false
                effect.push(EffectCreator.createEffect('weapon swing', this.attack_box.cord_x, this.attack_box.cord_y, this.attack_box.box_size_x, this.attack_box.box_size_y, this.attack_box.angle))
                for(let i = 0; i < enemy.length;i ++){
                    let target = enemy[i]
                    if(Functions.rectCollision(this.attack_box, target) && !target.damaged && !target.is_dead){
                        target.damage(Functions.angle(this, target))
                        Modal.createModal(this.getAttackDamage() ,target.cord_x, target.cord_y)
                        // return;
                    }
                }
            }
        }
        else if(this.is_cast || this.is_scroll || this.is_poution){

        }
        else if(this.defended){
            if(!input.e){
                this.idle()
            }
        }
        else {
            if(input.e){
                this.defend()
            }
            else if(input.r_click){
                this.cast()
            }
            else if(input.l_click && this.energy > 2){
                this.attack(mouse_cord)
            }
            else if(this.moveInputIsPressed(input)){
                if(input[' '] && this.energy > 0.5){
                    this.run(input, tick)
                }
                else{
                    this.move(input)
                }
            }
            else if(!this.is_idle){
                this.idle()
            }
        }

        this.frame_timer ++
        if(this.frame_timer >= this.frame_change_tick){
            this.frame_timer = 0
            this.frame ++
            if(this.frame >= this.max_frame){
                this.frame = 0
            }
        }
    }

    idle(){
        this.resetFrame()
        this.setSize(90, 93)
        this.is_idle = true
        this.y_frame_offset = 0
        this.max_frame = 9
        this.frame_change_tick = 7
    }

    damage(angle){
        this.resetFrame()
        this.setSize(90,93)
        this.damaged = true
        this.direction_angle = angle
        this.y_frame_offset = 399
        this.max_frame = 2
        this.frame_change_tick = 1
        this.setRecoveryTimeOut(1000)
    }

    attack(mouse){
        this.energy -= 2
        this.resetFrame()
        this.setSize(120,120)
        this.is_attack = true
        this.y_frame_offset = 187
        this.max_frame = 8
        this.frame_change_tick = 1000/350
        this.attack_box = this.angleToAttackRect(Functions.angle(this,mouse))
        this.setRecoveryTimeOut(1000)
    }

    run(input, tick){
        if(!this.is_run){
            this.resetFrame()
            this.setSize(90, 93)
            this.is_run = true
            this.y_frame_offset = 94
            this.max_frame = 4
            this.frame_change_tick = 3
        }
        else{
            this.getMoveAngle(input)
            let move_x = Math.sin(this.move_angle)
            this.fliped = move_x <= 0;
            let move_y = Math.cos(this.move_angle)
            this.setCord(move_x, move_y, 2)
        }
    }

    defend(){
        this.resetFrame()
        this.setSize(90, 93)
        this.defended = true
        this.y_frame_offset = 309
        this.max_frame = 2
        this.frame_change_tick = 12
    }

    move(input){
        if(!this.is_move){
            this.resetFrame()
            this.setSize(90, 93)
            this.is_move = true
            this.y_frame_offset = 94
            this.max_frame = 4
            this.frame_change_tick = 6
        }
        else{
            this.getMoveAngle(input)
            let move_x = Math.sin(this.move_angle)
            this.fliped = move_x <= 0;
            let move_y = Math.cos(this.move_angle)
            this.setCord(move_x, move_y)
        }
    }
}