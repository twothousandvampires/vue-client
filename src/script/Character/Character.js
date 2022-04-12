import Functions from "../GameFunctions";
import ImageData from "../ImageData";
import EffectCreator from "../Effects/EffectCreator.js";
import Inventory from "./Inventory";
import {effect} from "vue";

let data = new ImageData()

export default class Character{
    constructor(template ,items = false) {
        this.template = template
        if (items) {
            this.inv = new Inventory(items,this)
        }

        this.name = 'grim traveler'
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

        this.state = 'idle'

        this.move_angle = 0

        this.size_x = 90
        this.size_y = 93

        this.is_attack = false
        this.charged = false
        this.defended = false
        this.deal_hit = false

        this.box_size_x = 46
        this.box_size_y = 30

        this.speed = 2
        this.image = {
            y_draw_offset : 0,
            frame_timer : 0,
            frame : 0,
            src : data.getImage('grim'),
            'idle' : {
                sprite_size_w : 90,
                sprite_size_h : 93,
                y_offset : 0,
                max_frame : 9,
                tick : ()=> {return 10}
            },
            'defend' : {
                sprite_size_w : 92,
                sprite_size_h : 120,
                y_offset : 360,
                max_frame : 6,
                tick : ()=> {return 6}
            },
            'move' : {
                sprite_size_w : 90,
                sprite_size_h : 93,
                y_offset : 94,
                max_frame : 4,
                tick : ()=> {return 6}
            },
            'run' : {
                sprite_size_w : 90,
                sprite_size_h : 93,
                y_offset : 94,
                max_frame : 4,
                tick : ()=> {return 2}
            },
            'retreat' : {
                sprite_size_w : 90,
                sprite_size_h : 90,
                y_offset : 90,
                max_frame : 5,
            },
            'around' : {
                sprite_size_w : 90,
                sprite_size_h : 90,
                y_offset : 90,
                max_frame : 5,

            },
            'attack' : {
                sprite_size_w : 120,
                sprite_size_h : 120,
                y_offset : 187,
                max_frame : 9,
                tick : ()=> {return Math.floor(1500/350)}
            },
            'charge' : {
                sprite_size_w : 92,
                sprite_size_h : 120,
                y_offset : 480,
                max_frame : 4,
                tick : ()=> {return Math.floor(500/350)}
            }
        }
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

    act(mouse, effect, enemy){
        let input = mouse.getInput()
        let mouse_cord = {cord_x: input.canvas_x, cord_y: input.canvas_y}

        if(this.immobilized){
            //
        }
        else if(this.damaged){
            //
        }
        else if(this.defended){
            if(!input.e){
                this.state = 'idle'
                this.defended = false
                this.image.frame = 0
                this.image.frame_timer = 0
            }
        }
        else if(this.is_attack){
            this.attack(effect)
        }
        else if(this.charged){
            this.charge()
        }
        else {
            if(input.e){
                this.setDefend()
            }
            else if(input.q){
                let limit = 3
                let distance = Functions.distance(mouse_cord, this)
                let angle = Functions.angle(mouse_cord, this)
                EffectCreator.createChainLight(this.cord_x,this.cord_y,distance,angle,effect)
                let hited = []
                function chain(from){
                    hited.push(from)
                    for(let i =0 ; i < enemy.length; i++){
                        let elem = enemy[i]
                        let distance = Functions.distance(elem, from)
                        if(distance < 200 && !hited.includes(elem) && limit){
                            let angle = Functions.angle(elem, from)
                            EffectCreator.createChainLight(from.cord_x,from.cord_y,distance,angle,effect)
                            hited.push(elem)
                            limit--
                            chain(elem)
                        }
                    }
                }
                chain(mouse_cord)
            }
            else if(input.l_click){
                this.setAttack(mouse_cord)
            }
            else if(this.moveInputIsPressed(input)){
                if(input[' ']){
                    this.setRun(input)
                }
                else {
                    this.setMove(input)
                }
            }
            else {
                this.state = 'idle'
            }
        }
    }

    draw(ctx){
        let sheet = this.image[this.state]
        this.image.frame_timer ++
        if(this.image.frame_timer >= sheet.tick()){
            this.image.frame_timer = 0
            this.image.frame += 1
            if(this.image.frame >= sheet.max_frame && this.state !== 'attack'){
                this.image.frame = 0
            }
            else if(this.image.frame >= sheet.max_frame && this.state === 'attack'){
                this.image.frame = sheet.max_frame - 1
            }
        }

        let f_x = ((this.size_x * sheet.sprite_size_w) / 90) - this.size_x
        let f_y = ((this.size_y * sheet.sprite_size_h) / 93) - this.size_y

        if(this.fliped){
            ctx.save()
            Functions.flipHorizontally(ctx, this.cord_x)
        }

        ctx.drawImage(this.image.src, sheet.sprite_size_w * this.image.frame,sheet.y_offset,sheet.sprite_size_w - 2,sheet.sprite_size_h,this.cord_x - this.size_x/2 - f_x/2,this.cord_y - (this.size_y/2 + (this.size_y/2 - this.box_size_y/2)) - f_y/2 + this.image.y_draw_offset,this.size_x + f_x,this.size_y + f_y)

        if(this.fliped){
            ctx.restore()
        }

        // //show attack rect
        // if(this.attack_rect){
        //     game.ctx.fillStyle = 'yellow'
        //     game.ctx.fillRect(this.attack_rect.cord_x - this.attack_rect.box_size_x/2,this.attack_rect.cord_y - this.attack_rect.box_size_y/2,this.attack_rect.box_size_x,this.attack_rect.box_size_y)
        // }


        // ctx.fillStyle = 'blue'
        // ctx.fillRect(this.cord_x - this.box_size_x/2,this.cord_y - this.box_size_y/2,this.box_size_x,this.box_size_y)
    }

    setAttack(mouse){
        this.attack_angle  = Functions.angle(this,mouse)
        this.attack_rect = this.angleToAttackRect(this.attack_angle)
        this.image.frame = 0
        this.image.frame_timer = 0
        this.state = 'attack'
        this.is_attack = true
        setTimeout(()=>{
            this.deal_hit = false
            this.is_attack = false
            this.state = 'idle'
            this.image.frame = 0
            this.image.frame_timer = 0
        },1500)
    }

    setRun(input){
        this.state = 'run'
        this.getMoveAngle(input)
        let move_x = Math.sin(this.move_angle)
        this.fliped = move_x <= 0;
        let move_y = Math.cos(this.move_angle)
        this.setCord(move_x, move_y, 2)
    }

    setDefend(){
        this.state = 'defend'
        this.defended = true
        this.image.frame = 0
        this.image.frame_timer = 0
    }

    setMove(input){
        this.state = 'move'
        this.getMoveAngle(input)
        let move_x = Math.sin(this.move_angle)
        this.fliped = move_x <= 0;
        let move_y = Math.cos(this.move_angle)
        this.setCord(move_x, move_y)
    }

    charge(){
        let move_x = Math.sin(this.move_angle)
        this.fliped = move_x <= 0;
        let move_y = Math.cos(this.move_angle)
        this.setCord(move_x, move_y)
    }

    attack(effect){
        if(this.image.frame === 5 && !this.deal_hit){
            this.deal_hit = true
            EffectCreator.createWeaponSwing(this.attack_rect , this.attack_angle , effect)
        }
    }
}