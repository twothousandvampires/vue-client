import Functions from "../GameFunctions";
import ImageData from "../ImageData";
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
        this.attack_speed = 2000

        this.state = 'idle'

        this.move_angle = 0

        this.character_frame = 0
        this.character_timer = 0

        this.size_x = 92
        this.size_y = 120


        this.box_size_x = 46
        this.box_size_y = 30

        this.speed = 2
        this.image = {
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
            'charge' : {
                sprite_size_w : 90,
                sprite_size_h : 90,
                y_offset : 0,
                max_frame : 6,
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
            }
        }
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


        if(this.immobilized){
            //
        }
        else if(this.damaged){
            //
        }
        else if(this.state === 'attack'){

        }
        else {
            let input = game.mouse.getInput()

            if(this.moveInputIsPressed(input)){
                this.state = 'move'
                this.getMoveAngle(input)
                let move_x = Math.sin(this.move_angle)
                if(move_x <= 0 ){
                    this.fliped = true
                }
                else {
                    this.fliped = false
                }
                let move_y = Math.cos(this.move_angle)
                this.setCord(move_x, move_y)
            }
            else if(input.e){
                this.image.frame = 0
                this.image.frame_timer = 0
                this.state = 'attack'
                setTimeout(()=>{
                    this.state = 'idle'
                    this.image.frame = 0
                    this.image.frame_timer = 0
                },this.attack_speed)
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

        game.ctx.drawImage(this.image.src, sheet.sprite_size_w * this.image.frame,sheet.y_offset,sheet.sprite_size_w - 2,sheet.sprite_size_h,this.cord_x - this.size_x/2 - f_x/2,this.cord_y - (this.size_y/2 + (this.size_y/2 - this.box_size_y/2)) - f_y/2,this.size_x + f_x,this.size_y + f_y)

        if(this.fliped){
            game.ctx.restore()
        }

        // game.ctx.fillStyle = 'blue'
        // game.ctx.fillRect(this.cord_x - this.box_size_x/2,this.cord_y - this.box_size_y/2,this.box_size_x,this.box_size_y)
    }

}