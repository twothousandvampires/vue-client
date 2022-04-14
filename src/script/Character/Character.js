import Functions from "../GameFunctions";
import ImageData from "../ImageData";
import EffectCreator from "../Effects/EffectCreator.js";
import Inventory from "./Inventory";

export default class Character{
    constructor(template ,items = false) {

        this.template = template
        if (items) {
            this.inv = new Inventory(items,this)
        }

        this.img_name = 'grim traveler'
        this.parseStats(template)

        this.cord_x = 400 + 200
        this.cord_y = 400 + 400

        this.fliped = false

        this.immobilized = false
        this.damaged = false

        //ms
        this.attack_speed = 1200
        this.attack_range = 60

        this.attack_rect = undefined

        this.move_angle = 0
        this.direction_angle = false


        this.size_x = 90
        this.size_y = 93

        this.sprite_w = 90
        this.sprite_h = 93

        this.def_w = this.sprite_w
        this.def_h = this.sprite_h

        this.recovery_timeout = undefined

        this.y_frame_offset = 0
        this.max_frame = 9
        this.frame_change_tick = 7 // 7 * 50(game_tick) = 350 ms

        this.can_move = true
        this.frozen = false
        this.stunned = false

        this.is_cast = false
        this.is_poution = false
        this.is_scroll = false
        this.is_idle = true
        this.is_move = false
        this.is_run = false
        this.is_attack = false
        this.defended = false
        this.deal_hit = false

        this.box_size_x = 46
        this.box_size_y = 30

        this.frame = 0
        this.frame_timer = 0

        this.speed = 2

        this.calcStats()
    }

    parseStats(template){
        for(let elem in template){
            this[elem] = template[elem]
        }
    }

    calcStats(){
        this.calcLife()
        this.calcSpell()
        this.calcAttack()
    }

    calcSpell(){
        this.increased_spell_damage = this.increased_spell_damage - this.reduced_spell_damage
        this.increased_spell_aoe = this.increased_spell_aoe - this.reduced_spell_aoe
        this.spell_crit_chance = Math.floor(this.template.spell_crit_chance * (1 + ((this.increased_spell_crit_chance - this.reduced_spell_crit_chance) / 100)))
        this.increased_spell_crit_multy = this.increased_spell_crit_multy - this.reduced_spell_crit_multy
    }

    calcLife(){
        this.max_life = Math.floor(this.template.max_life * (1 + ((this.increased_life - this.reduced_life) / 100)))
        this.life = Math.floor(this.template.life * (1 + ((this.increased_life - this.reduced_life) / 100)))
    }

    calcAttack(){
        this.min_attack_damage = this.template.min_attack_damage
        this.max_attack_damage = this.template.max_attack_damage

        this.min_attack_damage = this.inv && this.inv.equip['1'] != 'empty' ? this.min_attack_damage  + this.inv.equip['1'].min_damage : this.min_attack_damage
        this.max_attack_damage = this.inv && this.inv.equip['1'] != 'empty' ? this.max_attack_damage  + this.inv.equip['1'].max_damage : this.max_attack_damage

        this.min_attack_damage = this.add_attack_damage ? this.min_attack_damage + Math.floor(this.add_attack_damage * 0.5) : this.min_attack_damage
        this.max_attack_damage = this.add_attack_damage ? this.max_attack_damage + Math.floor(this.add_attack_damage * 1.5) : this.max_attack_damage

        this.min_attack_damage = Math.floor(this.min_attack_damage * (1 + ((this.increased_attack_damage - this.reduced_attack_damage) / 100)))
        this.max_attack_damage = Math.floor(this.max_attack_damage * (1 + ((this.increased_attack_damage - this.reduced_attack_damage) / 100)))


        this.attack_crit_chance = this.inv && this.inv.equip['1'] != 'empty' ? this.inv.equip['1'].crit_chance : this.template.attack_crit_chance
        this.attack_crit_chance = Math.floor(this.attack_crit_chance * (1 + ((this.increased_attack_crit_chance - this.reduced_attack_crit_chance) / 100)))

        this.attack_crit_multy = Math.floor(this.template.attack_crit_multy + (this.increased_attack_crit_multy - this.reduced_attack_crit_multy))

        this.attack_speed = this.inv && this.inv.equip['1'] != 'empty' ? this.inv.equip['1'].attack_speed : this.template.attack_speed
        this.attack_speed = this.attack_speed / (1 + ((this.increased_attack_speed - this.reduced_attack_speed) / 100))

        this.attack_range = this.inv && this.inv.equip['1'] != 'empty' ? this.inv.equip['1'].attack_range : this.template.attack_range
        this.attack_range = this.attack_range * (1 + ((this.increased_attack_range - this.reduced_attack_range) / 100))
    }

    angleToAttackRect(angle){
        return {
            cord_x : this.cord_x + Math.sin(angle) * this.attack_range/2,
            cord_y : this.cord_y + Math.cos(angle) * this.attack_range/2,
            box_size_x : this.attack_range,
            box_size_y : this.attack_range
        }
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

    setCord(x ,y, m = 1){
        if(!(this.cord_x + x * this.speed * m >= 1000) && !(this.cord_x + x * this.speed * m <= 200)){
            this.cord_x += x * this.speed * m
        }
        if(!(this.cord_y + y * this.speed * m >= 1200) && !(this.cord_y + y * this.speed * m <= 400)){
            this.cord_y += y * this.speed * m
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

    setSize(x, y){
        this.size_x = x
        this.size_y = y
        this.sprite_w = x
        this.sprite_h = y
    }

    idle(){
        this.resetFrame()
        this.setSize(90, 93)
        this.is_idle = true
        this.y_frame_offset = 0
        this.max_frame = 9
        this.frame_change_tick = 7
    }

    setRecoveryTimeOut(ms){
        clearTimeout(this.recovery_timeout)
        this.recovery_timeout = setTimeout(()=>{
            this.idle()
        },ms)
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

    act(mouse, effect, enemy){

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
            enemy.forEach(elem => {
                if(Functions.rectCollision(this.attack_box, elem) && this.frame === 5 && !elem.damaged && !elem.is_dead){
                    elem.damage(Functions.angle(this, elem))
                }
            })
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
            else if(input.l_click){
                this.attack(mouse_cord)
            }
            else if(this.moveInputIsPressed(input)){
                if(input[' ']){
                    this.run(input)
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

    attack(mouse){
        this.resetFrame()
        this.setSize(120,120)
        this.is_attack = true
        this.y_frame_offset = 187
        this.max_frame = 8
        this.frame_change_tick = 1000/350
        this.attack_box = this.angleToAttackRect(Functions.angle(this,mouse))
        this.setRecoveryTimeOut(1000)
    }

    run(input){
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