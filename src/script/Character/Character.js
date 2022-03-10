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
                f : 0
            },
            'defend' : {
                sprite_size_w : 92,
                sprite_size_h : 120,
                y_offset : 360,
                max_frame : 6,
                f : 0
            },
            'move' : {
                sprite_size_w : 92,
                sprite_size_h : 120,
                y_offset : 120,
                max_frame : 6,
                f : 0
            },
            'retreat' : {
                sprite_size_w : 90,
                sprite_size_h : 90,
                y_offset : 90,
                max_frame : 5,
                f : 0
            },
            'around' : {
                sprite_size_w : 90,
                sprite_size_h : 90,
                y_offset : 90,
                max_frame : 5,
                f : 0

            },
            'attack' : {
                sprite_size_w : 152,
                sprite_size_h : 120,
                y_offset : 240,
                max_frame : 8,
                f : 32
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

        let input = game.mouse.getInput()

        if(input.e){
            this.state = 'defend'
        }

        else if(this.moveInputIsPressed(input)){
            this.state = 'move'
            this.getMoveAngle(input)
            this.setCord(Math.sin(this.move_angle), Math.cos(this.move_angle))
        }
        else if(input.e){
            this.state = 'attack'
        }
        else {
            this.state = 'idle'
        }
        this.draw(game)
    }
    draw(game){


        let sheet = this.image[this.state]

        this.image.frame_timer ++
        if(this.image.frame_timer === 6){
            this.image.frame_timer = 0
            this.image.frame += 1
            if(this.image.frame === sheet.max_frame){
                this.image.frame = 0
            }
        }

        let f_x = ((this.size_x * sheet.sprite_size_w) / 92) - this.size_x
        let f_y = ((this.size_y * sheet.sprite_size_h) / 120) - this.size_y


        game.ctx.drawImage(this.image.src, sheet.sprite_size_w * this.image.frame,sheet.y_offset,sheet.sprite_size_w - 2,sheet.sprite_size_h,this.cord_x - this.size_x/2 - f_x/2,this.cord_y - (this.size_y/2 + (this.size_y/2 - this.box_size_y/2)) - f_y/2,this.size_x + f_x,this.size_y + f_y)


        // game.ctx.fillStyle = 'blue'
        // game.ctx.fillRect(this.cord_x - this.box_size_x/2,this.cord_y - this.box_size_y/2,this.box_size_x,this.box_size_y)
    }

}