export default class Render{

    constructor(context ,mouse) {
        this.ctx = context
        this.mouse = mouse
    }

    drawWorld(game,timer){
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
                            if(Math.abs(game.char.pretti_x + 5 - elem.pretti_x) <= 1 && Math.abs(game.char.pretti_y + 5 - elem.pretti_y) <=1){
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



            this.ctx.clearRect(0,0,1000,1000)
            this.ctx.drawImage(game.img_data.getImage('background'),0,0,1000,1000,0,0,1000,1000)
            game.data.forEach(elem => {
                elem.frame_timer += 1
                if(elem.frame_timer === 6){
                    elem.frame_timer = 0
                    elem.frame += 1
                    if(elem.frame === 10){
                        elem.frame = 0
                    }
                }
                this.ctx.drawImage(elem.img,50 * elem.frame,0,50,50,elem.pretti_x * 80 + elem.image_offset_x * 2 ,elem.pretti_y * 80 + elem.image_offset_y * 2 ,80,80)
            })
            this.ctx.fillStyle = 'black'
            this.ctx.fillRect(500 + (game.char.pretti_x * 40), 500 + (game.char.pretti_y * 40),20,20)

        if(game.over_node){
            let frame = game.over_node.type != 1 ? game.img_data.getImage('green_frame') : game.img_data.getImage('red_frame')
            this.ctx.drawImage(frame,0,0,30,30,game.over_node.pretti_x * 80 + game.over_node.image_offset_x * 2 ,game.over_node.pretti_y * 80 + game.over_node.image_offset_y * 2 ,80,80)
        }
    }
}