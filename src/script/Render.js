import ImageData from "./ImageData.js";
import Functions from "./GameFunctions";
import Unit from "./scr/Unit";
import Effect from "./scr/Effect";

export default class Render{

    constructor(ctx){
        this.bg_frame = 0
        this.bg_timer = 0
        this.cell_size = 100
        this.ctx = document.getElementById('game-canvas').getContext('2d')
        this.ctx.imageSmoothingEnabled= false
        this.img_data = new ImageData()

        this.can_w = 900
        this.can_h = 900
        this.character_frame = 0
        this.character_timer = 0
        // ms
        this.bg_aniamtion_speed = 4000

        this.test_circle = {
            cord_x: 600,
            cord_y: 600,
            r: 20,
            color: 'red'
        }

        this.show_box = false
        this.show_state = false
        this.show_attack_box = false
    }

    drawBg(context){
        // this.bg_timer += 1
        // if(this.bg_timer >= this.bg_aniamtion_speed / 50){
        //     this.bg_timer = 0
        //     this.bg_frame += 1
        //     if(this.bg_frame === 8){
        //         this.bg_frame = 0
        //     }
        // }
        this.ctx.drawImage(this.img_data.getImage('background'),0,0,900,900,context.map.start_x - 25,context.map.start_y - 25,context.map.width + 50,context.map.height +50)
        // this.ctx.strokeStyle = 'yellow'
        // this.ctx.strokeRect(context.map.start_x,context.map.start_y,context.map.width,context.map.height)
        // this.ctx.fillStyle = 'black'
    }

    drawWorld(map ,char){
        this.ctx.fillStyle = 'black'
        this.ctx.clearRect(0,0,1300,1300)
        this.ctx.fillRect(0,0,1300,1300)


        map.forEach(row => {
            row.forEach(elem => {
                if(elem.visited || elem.light){
                    this.ctx.drawImage(this.img_data.getImage('tile'),elem.tile[0],elem.tile[1],100,100,elem.pretti_x * this.cell_size,elem.pretti_y * this.cell_size, this.cell_size, this.cell_size)
                    if(elem.content_name){
                        elem.frame_timer ++
                        if(elem.frame_timer > 10){
                            elem.frame_timer = 0
                            elem.frame ++
                            if(elem.frame >= elem.max_frame){
                                elem.frame = 0
                            }
                        }
                        this.ctx.drawImage(this.img_data.getImage(elem.content_name),
                            elem.frame * elem.content_sprite_w,
                            0,
                            elem.content_sprite_w,
                            elem.content_sprite_h,
                            elem.pretti_x * this.cell_size + elem.content_img_offset_x,
                            elem.pretti_y * this.cell_size + elem.content_img_offset_y,
                            elem.size_w,
                            elem.size_h)
                    }
                    if(elem.mist_offsets && !elem.visited){
                        elem.mist_offsets.forEach(mist => {
                            this.ctx.drawImage(this.img_data.getImage('mist'),elem.mist_frame * 100, mist ,100,100,elem.pretti_x * this.cell_size,elem.pretti_y * this.cell_size - (mist == 0 && elem.mist_draw_offset ? elem.mist_draw_offset : 0), this.cell_size, this.cell_size)
                        })
                        elem.mist_timer ++
                        if(elem.mist_timer >= 4){
                            elem.mist_timer = 0
                            elem.mist_frame ++
                            if(elem.mist_frame >= elem.mist_max_frame){
                                elem.mist_frame = 0
                            }
                        }
                    }
                }
            })
        })

        if(char.fliped){
            this.ctx.save()
            Functions.flipHorizontally(this.ctx, char.pretti_x * this.cell_size)
        }
        this.ctx.drawImage(this.img_data.getImage('chel'),96 * char.frame,char.y_frame_offset,96,96,char.pretti_x * this.cell_size + (!char.fliped ? 20 : -80),char.pretti_y * this.cell_size -20, 72, 72)
        if(char.fliped){
            this.ctx.restore()
        }
        char.frame_timer ++
        if(char.frame_timer >= char.frame_change_tick){
            char.frame_timer = 0
            char.frame ++
            if(char.frame >= char.max_frame){
                char.frame = 0
            }
        }
    }

    drawFight(fight_context){
        let char = fight_context.player
        this.ctx.clearRect(0,0,1300,1300)
        this.drawBg(fight_context)
        let all = fight_context.effects_before.concat(fight_context.areas_before)

        let to_sort = [fight_context.player].concat(fight_context.enemy).concat(fight_context.effects).concat(fight_context.projectiles).concat(fight_context.map.rocks)

        to_sort.sort(function(a,b){
            return a.cord_y - b.cord_y
        })

        all = all.concat(to_sort).concat(fight_context.effects_after).concat(fight_context.areas_after)

        all.forEach(elem =>{
            if(elem.opacity != 1){
                this.ctx.globalAlpha = elem.opacity
            }
            if(elem.fliped){
                this.ctx.save()
                Functions.flipHorizontally(this.ctx, elem.cord_x)
            }
            if(elem.angle){
                this.ctx.translate(elem.cord_x, elem.cord_y);
                this.ctx.rotate(-elem.angle);
                this.ctx.drawImage(this.img_data.getImage(elem.sptite.name), elem.sprite_w * elem.frame, 0 ,elem.sprite_w ,elem.sprite_h,- elem.size_x/2 , - elem.size_y/2 , elem.size_x  , elem.size_y );
                this.ctx.rotate(elem.angle);
                this.ctx.translate(-elem.cord_x, -elem.cord_y);
            }
            else {
                this.ctx.drawImage(this.img_data.getImage(elem.sptite.name),
                    elem.sprite_w * elem.frame,
                    elem.y_frame_offset,
                    elem.sprite_w,
                    elem.sprite_h,
                    elem.cord_x - elem.size_x/2,
                    elem.cord_y - elem.size_y + elem.box_size_y/2,
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
                this.ctx.fillText(elem.state,elem.cord_x,elem.cord_y - elem.box_size_y/2 -100,)
            }

            // if(elem instanceof Enemy){
            //     this.ctx.fillStyle = 'yellow'
            //     this.ctx.fillText(elem.getStat('speed'),elem.cord_x,elem.cord_y - elem.box_size_y/2 -100,)
            //     this.ctx.fillText(elem.name,elem.cord_x,elem.cord_y - elem.box_size_y/2 -120,)
            //     this.ctx.fillText(elem.stats.more_speed,elem.cord_x,elem.cord_y - elem.box_size_y/2 -140,)
            // }

            if(elem.opacity != 1){
                this.ctx.globalAlpha = 1
            }
            if(elem.status){
                elem.status.pull.forEach(status => {
                    this.ctx.drawImage(this.img_data.getImage(elem.sptite.name),
                        status.sprite_w * status.frame,
                        status.y_frame_offset,
                        status.sprite_w,
                        status.sprite_h,
                        status.cord_x,
                        status.cord_y,
                        status.size_x,
                        status.size_y)
                })
            }
        })

        const centerX = this.test_circle.cord_x
        const centerY = this.test_circle.cord_y
        const radius = this.test_circle.r

        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = Functions.circleRectCollision(this.test_circle, char) ? 'green' : 'red'
        this.ctx.fill();
    }
}