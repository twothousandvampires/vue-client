export default class Render{

    constructor(context ,mouse) {
        this.ctx = context
        this.mouse = mouse
        this.bg_frame = 0
        this.bg_timer = 0

        this.can_w = 900
        this.can_h = 900
        this.character_frame = 0
        this.character_timer = 0
        // ms
        this.bg_aniamtion_speed = 4000
    }

    drawBg(game){
        this.bg_timer += 1
        if(this.bg_timer >= this.bg_aniamtion_speed / 50){
            this.bg_timer = 0
            this.bg_frame += 1
            if(this.bg_frame === 8){
                this.bg_frame = 0
            }
        }
        this.ctx.drawImage(game.img_data.getImage('background'),this.bg_frame * 300,0,300,300,0,0,this.can_w,this.can_h)
    }

    drawWorld(game){
        this.ctx.clearRect(0,0,900,900)
        this.drawBg(game);

        let coords = this.mouse.getСoord()

        if(coords){
            game.data.forEach(elem => {
                if(coords.x > elem.pretti_x * 80
                    && coords.x < elem.pretti_x * 80 + 80
                    && coords.y > elem.pretti_y * 80
                    && coords.y < elem.pretti_y * 80 + 80){
                    elem.over = true
                        game.over_node = elem
                        if(this.mouse.click){
                            if(Math.abs(game.char.pretti_x - elem.pretti_x) <= 1 && Math.abs(game.char.pretti_y - elem.pretti_y) <=1){
                                game.goTo(elem)
                            }
                        }
                    }
                else {
                    elem.over = false
                }
            })
        }
        if(!game.data.some(elem =>{
            return elem.over
        })){
            game.over_node = false
        }

        game.data.forEach(elem => {
            elem.frame_timer += 1
            if(elem.frame_timer === 6){
                elem.frame_timer = 0
                elem.frame += 1
                if(elem.frame === 8){
                    elem.frame = 0
                    elem.frame = 0
                }
            }
            if(!(elem.pretti_x === game.char.pretti_x && elem.pretti_y === game.char.pretti_y) ){
                this.ctx.drawImage(elem.img,100 * elem.frame,0,100,100,elem.pretti_x * 80 + elem.image_offset_x * 2 ,elem.pretti_y * 80 + elem.image_offset_y * 2 ,60,60)
            }
            if(elem.type == 1){
                this.ctx.drawImage(game.img_data.getImage('shadow'),100 * elem.frame,0,100,100,elem.pretti_x * 80 + elem.image_offset_x * 2 ,elem.pretti_y * 80 + elem.image_offset_y * 2 ,60,60)
            }
        })

        this.character_timer += 1
        if(this.character_timer === 2){
            this.character_timer = 0
            this.character_frame += 1
            if(this.character_frame === 6){
                this.character_frame = 0
            }
        }

        this.ctx.drawImage(game.img_data.getImage('char'),this.character_frame * 92,0,92,120,game.char.pretti_x * 80 - 23,game.char.pretti_y * 80 - 30,92,120)

        if(game.over_node){
            let frame = game.over_node.type != 1 ? game.img_data.getImage('green_frame') : game.img_data.getImage('red_frame')
            this.ctx.drawImage(frame,0,0,60,60,game.over_node.pretti_x * 80 + game.over_node.image_offset_x * 2  - 12 ,game.over_node.pretti_y * 80 + game.over_node.image_offset_y * 2 - 12
                ,80,80)
        }
    }

    drawFight(game){
        this.ctx.clearRect(0,0,900,900)
        // this.drawBg(game);

        game.char.act(game)

        game.enemy.forEach(elem => {
            elem.act(game)
            elem.draw(game)
        })
    }
}