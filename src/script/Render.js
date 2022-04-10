import ImageData from "./ImageData.js";
export default class Render{

    constructor(ctx){
        this.bg_frame = 0
        this.bg_timer = 0
        this.cell_size = 100
        this.ctx = ctx
        this.ctx.imageSmoothingEnabled= false
        this.image_data = new ImageData()

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
        this.ctx.drawImage(this.image_data.getImage('background'),0,0,800,800,200,400,800,800)
    }

    drawWorld(game){
        this.ctx.fillStyle = 'black'
        this.ctx.clearRect(0,0,2000,2000)
        this.ctx.fillRect(0,0,2000,2000)

        game.nodes.forEach(elem => {
            // animation
            // elem.frame_timer += 1
            //     elem.frame_timer = 0
            //     elem.frame += 1
            //     if(elem.frame === 8){
            //         elem.frame = 0
            //         elem.frame = 0
            //     }
            // }
            if(elem.visited){
                elem.draw(this.ctx, this.cell_size)
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
    }

    drawFight(char, enemy, effects){
        this.ctx.clearRect(0,0,1300,1300)
        this.drawBg()
        let all = [char].concat(enemy).concat(effects)
        all.sort(function(a,b){
            return a.cord_y - b.cord_y
        })

        all.forEach(elem =>{
            elem.draw(this.ctx)
        })

    }
}