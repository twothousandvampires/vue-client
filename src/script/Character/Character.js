import Functions from "../GameFunctions";
import ImageData from "../ImageData";
import EffectCreator from "../Effects/EffectCreator.js";

let data = new ImageData()

export default class Character{

    constructor(template) {

        this.name = template.name
        this.class = template.class
        this.level = template.level
        this.world_x = template.x
        this.world_y = template.y
        this.hit_point = template.hit_point
        this.max_hit_point = template.max_hit_point
        this.energy = template.energy
        this.max_energy = template.max_energy
        this.min_damage = template.min_damage
        this.max_damage = template.max_damage

        this.cord_x = 450
        this.cord_y = 450

        this.fliped = false

        this.immobilized = false
        this.damaged = false

        //ms
        this.attack_speed = 1500
        this.attack_range = 300

        this.attack_rect = undefined

        this.state = 'idle'

        this.move_angle = 0

        this.size_x = 92
        this.size_y = 120

        this.is_attack = false
        this.charged = false
        this.defended = false
        this.deal_hit = false

        this.box_size_x = 46
        this.box_size_y = 30

        this.speed = 2
        this.image = {
            y_draw_offset : 30,
            frame_timer : 0,
            frame : 0,
            src : data.getImage('young'),
            'idle' : {
                sprite_size_w : 92,
                sprite_size_h : 120,
                y_offset : 0,
                max_frame : 6,
                tick : ()=> {return 6}
            },
            'defend' : {
                sprite_size_w : 92,
                sprite_size_h : 120,
                y_offset : 360,
                max_frame : 6,
                tick : ()=> {return 6}
            },
            'move' : {
                sprite_size_w : 92,
                sprite_size_h : 120,
                y_offset : 120,
                max_frame : 6,
                tick : ()=> {return 6}
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
                sprite_size_w : 152,
                sprite_size_h : 120,
                y_offset : 240,
                max_frame : 8,
                tick : ()=> {return Math.floor(this.attack_speed/350)}
            },
            'charge' : {
                sprite_size_w : 92,
                sprite_size_h : 120,
                y_offset : 480,
                max_frame : 4,
                tick : ()=> {return Math.floor(500/350)}
            }
        }
    }

    angleToAttackRect(angle){
        return {
            cord_x : this.cord_x + Math.sin(angle) * this.attack_range/2,
            cord_y : this.cord_y + Math.cos(angle) * this.attack_range/2,
            box_size_x : this.attack_range,
            box_size_y : this.attack_range
        }


        // if(angle > 0 && angle < 1.56){
        //     console.log('!')
        //     return {
        //         cord_x : this.cord_x,
        //         cord_y : this.cord_y,
        //         box_size_x : this.attack_range,
        //         box_size_y : this.attack_range
        //     }
        // }
        // if(angle > 1.56 && angle < 3.12){
        //     console.log('!')
        //     return {
        //         cord_x : this.cord_x,
        //         cord_y : this.cord_y - this.attack_range,
        //         box_size_x : this.attack_range,
        //         box_size_y : this.attack_range
        //     }
        // }
        // if(angle > 3.12 && angle < 4.68){
        //     console.log('!')
        //     return {
        //         cord_x : this.cord_x - this.attack_range ,
        //         cord_y : this.cord_y - this.attack_range,
        //         box_size_x : this.attack_range,
        //         box_size_y : this.attack_range
        //     }
        // }
        // if(angle > 4.68 || angle < 6.24){
        //     console.log('!')
        //     return {
        //         cord_x : this.cord_x - this.attack_range,
        //         cord_y : this.cord_y,
        //         box_size_x : this.attack_range,
        //         box_size_y : this.attack_range
        //     }
        // }
    }

    setCord(x ,y){
        this.cord_x += x * this.speed
        this.cord_y += y * this.speed
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

    act(game){
        // get pressed keys
        let input = game.mouse.getInput()
        let mouse_cord = game.mouse.getСoord()
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
            this.attack(game)
        }
        else if(this.charged){
            this.charge()
        }
        else {
            if(input.e){
                this.setDefend()
            }
            else if(input.q){
                this.setAttack(input,mouse_cord ,game)
            }
            else if(this.moveInputIsPressed(input)){
                if(input[' ']){
                    this.setCharge(input)
                }
                else {
                    this.setMove(input)
                }
            }
            else {
                this.state = 'idle'
            }
        }
        this.draw(game)
    }

    draw(game){
        let sheet = this.image[this.state]
        this.image.frame_timer ++
        if(this.image.frame_timer >= sheet.tick()){
            this.image.frame_timer = 0
            this.image.frame += 1
            if(this.image.frame === sheet.max_frame && this.state !== 'attack'){
                this.image.frame = 0
            }
            else if(this.image.frame === sheet.max_frame && this.state === 'attack'){
                this.image.frame = sheet.max_frame - 1
            }
        }

        let f_x = ((this.size_x * sheet.sprite_size_w) / 92) - this.size_x
        let f_y = ((this.size_y * sheet.sprite_size_h) / 120) - this.size_y

        if(this.fliped){
            game.ctx.save()
            Functions.flipHorizontally(game.ctx, this.cord_x)
        }

        game.ctx.drawImage(this.image.src, sheet.sprite_size_w * this.image.frame,sheet.y_offset,sheet.sprite_size_w - 2,sheet.sprite_size_h,this.cord_x - this.size_x/2 - f_x/2,this.cord_y - (this.size_y/2 + (this.size_y/2 - this.box_size_y/2)) - f_y/2 + this.image.y_draw_offset,this.size_x + f_x,this.size_y + f_y)

        if(this.fliped){
            game.ctx.restore()
        }

        // //show attack rect
        // if(this.attack_rect){
        //     game.ctx.fillStyle = 'yellow'
        //     game.ctx.fillRect(this.attack_rect.cord_x - this.attack_rect.box_size_x/2,this.attack_rect.cord_y - this.attack_rect.box_size_y/2,this.attack_rect.box_size_x,this.attack_rect.box_size_y)
        // }


        game.ctx.fillStyle = 'blue'
        game.ctx.fillRect(this.cord_x - this.box_size_x/2,this.cord_y - this.box_size_y/2,this.box_size_x,this.box_size_y)
    }

    setAttack(input, mouse, game){
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
        },this.attack_speed)
    }

    setCharge(input){
        this.image.frame = 0
        this.image.frame_timer = 0
        this.state = 'charge'
        this.speed = 8
        this.charged = true
        this.getMoveAngle(input)
        setTimeout(()=>{
            this.charged = false
            this.state = 'idle'
            this.speed = 2
            this.image.frame = 0
            this.image.frame_timer = 0
        },500)
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

    attack(game){
        if(this.image.frame === 5 && !this.deal_hit){
            console.log('!')
            this.deal_hit = true
            EffectCreator.createWeaponSwing(this.attack_rect , this.attack_angle , game)
        }
    }


}