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

        this.move_angle = 0

        this.character_frame = 0
        this.character_timer = 0

        this.speed = 2
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

        if(this.moveInputIsPressed(input)){
            this.getMoveAngle(input)
            this.setCord(Math.sin(this.move_angle), Math.cos(this.move_angle))
        }
        this.draw(game)
    }
    draw(game){
        this.character_timer += 1
        if(this.character_timer === 2){
            this.character_timer = 0
            this.character_frame += 1
            if(this.character_frame === 6){
                this.character_frame = 0
            }
        }
        game.ctx.drawImage(game.img_data.getImage('char'),this.character_frame * 92,0,92,120, this.cord_x - 46, this.cord_y- 60,92,120)
    }

}