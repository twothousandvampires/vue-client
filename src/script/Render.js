import ImageData from "./ImageData.js";
import Functions from "./GameFunctions";
import Unit from "./scr/Unit";
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

        this.show_box = false
        this.show_state = false
        this.show_attack_box = false
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
        this.ctx.drawImage(this.img_data.getImage('background'),0,0,850,850,150,350,850,850)
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
        let all = [char].concat(enemy).concat(effects)

        all.sort(function(a,b){
            return a.cord_y - b.cord_y
        })

        all.forEach(elem =>{
            if(elem.fliped){
                this.ctx.save()
                Functions.flipHorizontally(this.ctx, elem.cord_x)
            }
            if(elem.angle){
                this.ctx.translate(elem.cord_x, elem.cord_y);
                this.ctx.rotate(-elem.angle);
                this.ctx.drawImage(this.img_data.getImage(elem.img_name), elem.sprite_w * elem.frame, 0 ,elem.sprite_w ,elem.sprite_h,- elem.size_x/2 , - elem.size_y/2 , elem.size_x  , elem.size_y );
                this.ctx.rotate(elem.angle);
                this.ctx.translate(-elem.cord_x, -elem.cord_y);
            }
            else {
                this.ctx.drawImage(this.img_data.getImage(elem.img_name),
                    elem.sprite_w * elem.frame,
                    elem.y_frame_offset,
                    elem.sprite_w,
                    elem.sprite_h,
                    elem.cord_x - elem.size_x/2,
                    elem.cord_y - elem.size_y + elem.box_size_y/2 + (elem.size_y - elem.def_h)/2,
                    elem.size_x,
                    elem.size_y)
            }

            if(elem.fliped){
                this.ctx.restore()
            }
            if(this.show_box){
                this.ctx.fillRect(elem.cord_x - elem.box_size_x/2,elem.cord_y - elem.box_size_y/2, elem.box_size_x, elem.box_size_y)
            }
            if(this.show_attack_box){
                if(elem.is_attack){
                    this.ctx.fillRect(elem.attack_box.cord_x - elem.attack_box.box_size_x/2,elem.attack_box.cord_y - elem.attack_box.box_size_y/2, elem.attack_box.box_size_x, elem.attack_box.box_size_y)
                }
            }
            if(this.show_state){
                this.ctx.fillStyle = 'yellow'
                this.ctx.fillText(elem.getState(),elem.cord_x,elem.cord_y - elem.box_size_y/2 -100,)
            }
        })
    }
}