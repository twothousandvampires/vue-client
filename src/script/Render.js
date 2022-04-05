export default class Render{

    constructor(ctx, input, img_data) {
        this.bg_frame = 0
        this.bg_timer = 0
        this.cell_size = 100
        this.ctx = ctx
        this.input = input

        this.image_data = img_data

        this.can_w = 900
        this.can_h = 900
        this.character_frame = 0
        this.character_timer = 0
        // ms
        this.bg_aniamtion_speed = 4000
    }

    drawBg(){
        this.bg_timer += 1
        if(this.bg_timer >= this.bg_aniamtion_speed / 50){
            this.bg_timer = 0
            this.bg_frame += 1
            if(this.bg_frame === 8){
                this.bg_frame = 0
            }
        }
        this.ctx.drawImage(this.image_data.getImage('background'),this.bg_frame * 300,0,300,300,0,0,this.can_w,this.can_h)
    }

    getTile(node){
        let x,y
        if(node.n_link && node.s_link && node.w_link && node.e_link){
            x = 0
            y = 150
        }
        else if(node.n_link && node.s_link && node.w_link){
            x = 150
            y = 100
        }
        else if(node.n_link && node.s_link && node.e_link){
            x = 100
            y = 100
        }
        else if(node.w_link && node.e_link && node.n_link){
            x = 50
            y = 100
        }else if(node.w_link && node.e_link && node.s_link){
            x = 0
            y = 100
        }
        else if(node.n_link && node.s_link){
            x = 50
            y = 50
        }
        else if(node.w_link && node.e_link){
            x = 0
            y = 50
        }
        else if(node.n_link && node.e_link){
            x = 250
            y = 50
        }
        else if(node.w_link && node.n_link){
            x = 200
            y = 50
        }
        else if(node.s_link && node.e_link){
            x = 100
            y = 50
        }
        else if(node.w_link && node.s_link){
            x = 150
            y = 50
        }
        else if(node.w_link){
            x = 0
            y = 0
        }
        else if(node.e_link){
            x = 50
            y = 0
        }
        else if(node.n_link){
            x = 100
            y = 0
        }
        else if(node.s_link){
            x = 150
            y = 0
        }


        return[x,y]
    }

    drawWorld(game){
        this.ctx.fillStyle = 'black'
        this.ctx.clearRect(0,0,2000,2000)
        this.ctx.fillRect(0,0,2000,2000)
        let coords = this.input.getСoord()
        let click = this.input.pressed.click

        if(coords){
            game.data.forEach(elem => {
                if(coords.cord_x > elem.pretti_x * this.cell_size
                    && coords.cord_x < elem.pretti_x * this.cell_size + this.cell_size
                    && coords.cord_y > elem.pretti_y * this.cell_size
                    && coords.cord_y < elem.pretti_y * this.cell_size + this.cell_size){
                    elem.over = true
                        game.over_node = elem
                        if(click){
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
            // animation
            // elem.frame_timer += 1
            // if(elem.frame_timer === 6){
            //     elem.frame_timer = 0
            //     elem.frame += 1
            //     if(elem.frame === 8){
            //         elem.frame = 0
            //         elem.frame = 0
            //     }
            // }
            if(elem.visited){
                let x = this.getTile(elem)
                this.ctx.drawImage(game.img_data.getImage('tile'),x[0]*2,x[1]*2,100,100,elem.pretti_x * this.cell_size,elem.pretti_y * this.cell_size, this.cell_size,this.cell_size)
            }
            // this.ctx.strokeRect(elem.pretti_x * this.cell_size,elem.pretti_y * this.cell_size,this.cell_size,this.cell_size)
        })

        this.character_timer += 1
        if(this.character_timer === 2){
            this.character_timer = 0
            this.character_frame += 1
            if(this.character_frame === 6){
                this.character_frame = 0
            }
        }

        this.ctx.drawImage(game.img_data.getImage('chel'),0,0,90,93,game.char.pretti_x * this.cell_size+20,game.char.pretti_y * this.cell_size,60,62)

        // if(game.over_node){
        //     let frame = game.over_node.type != 1 ? game.img_data.getImage('green_frame') : game.img_data.getImage('red_frame')
        //     this.ctx.drawImage(frame,0,0,60,60,game.over_node.pretti_x * 80 + game.over_node.image_offset_x * 2  - 12 ,game.over_node.pretti_y * 80 + game.over_node.image_offset_y * 2 - 12
        //         ,80,80)
        // }
    }

    drawFight(game){
        this.ctx.clearRect(0,0,900,900)
        this.drawBg(game)
        game.char.act(game)

        game.enemy.forEach(elem => {
            elem.act(game)
            elem.draw(game)
        })

        game.effects.forEach(elem => {
            elem.act(game)
        })
    }
}