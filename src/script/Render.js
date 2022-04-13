import ImageData from "./ImageData.js";
import Functions from "./GameFunctions";
export default class Render{

    constructor(ctx){
        this.bg_frame = 0
        this.bg_timer = 0
        this.cell_size = 100
        this.ctx = ctx
        this.ctx.imageSmoothingEnabled= false
        this.img_data = new ImageData()

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
        this.ctx.drawImage(this.img_data.getImage('background'),0,0,800,800,200,400,800,800)
    }

    drawWorld(game){
        this.ctx.fillStyle = 'black'
        this.ctx.clearRect(0,0,1300,1300)
        this.ctx.fillRect(0,0,1300,1300)

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
                this.ctx.drawImage(this.img_data.getImage('tile'),elem.tile[0],elem.tile[1],100,100,elem.pretti_x * this.cell_size,elem.pretti_y * this.cell_size, this.cell_size, this.cell_size)
                if(elem.content_name){
                    elem.frame_timer ++
                    if(elem.frame_timer > 10){
                        elem.frame_timer = 0
                        elem.frame ++
                        if(elem.frame > 6){
                            elem.frame = 0
                        }
                    }
                    this.ctx.drawImage(this.img_data.getImage(elem.content_name),elem.frame * 90,0,90,90,elem.pretti_x * this.cell_size + 20,elem.pretti_y * this.cell_size, 60, 60)
                }
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

        this.ctx.drawImage(this.img_data.getImage('chel'),0,0,90,93,game.char.pretti_x * this.cell_size+20,game.char.pretti_y * this.cell_size,60,62)
    }

    drawFight(char, enemy, effects){
        this.ctx.clearRect(0,0,1300,1300)
        this.drawBg()
        // let all = [char].concat(enemy).concat(effects)
        let all = [char]
        all.sort(function(a,b){
            return a.cord_y - b.cord_y
        })
        all.forEach(elem =>{
            if(elem.fliped){
                this.ctx.save()
                Functions.flipHorizontally(this.ctx, elem.cord_x)
            }
            this.ctx.drawImage(this.img_data.getImage(elem.img_name), elem.sprite_w * elem.frame, elem.y_frame_offset ,elem.sprite_w, elem.sprite_h, elem.cord_x - elem.size_x/2, elem.cord_y - elem.size_y/2, elem.size_x, elem.size_y)

            if(elem.fliped){
                this.ctx.restore()
            }
        })
    }
}