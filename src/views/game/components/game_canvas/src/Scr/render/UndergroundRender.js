import Render from "./Render";
import Functions from "../../GameFunctions";
export default class UndergroundRender extends Render{

    constructor() {
        super();
    }

    draw(map, char){
        this.ctx.fillStyle = 'black'
        this.ctx.clearRect(0,0,1300,1300)
        this.ctx.fillRect(0,0,1300,1300)

        map.forEach(row => {
            row.forEach(elem => {
                if(elem.visited || elem.light){
                    let sprite = elem.sprite
                    this.ctx.drawImage(sprite.img, sprite.frame * sprite.width, sprite.y_frame_offset, sprite.width, sprite.height, elem.pretti_x * sprite.width, elem.pretti_y * sprite.height, sprite.width, sprite.height)
                    if(elem.content_sprite){
                        let content_sprite = elem.content_sprite
                        this.ctx.drawImage(content_sprite.img,
                            content_sprite.frame * content_sprite.width,
                            content_sprite.y_frame_offset,
                            content_sprite.width,
                            content_sprite.height,
                            elem.pretti_x * this.cell_size + content_sprite.content_img_offset_x,
                            elem.pretti_y * this.cell_size + content_sprite.content_img_offset_y,
                            content_sprite.size_w,
                            content_sprite.size_h)
                        content_sprite.act()
                    }
                    // if(elem.mist_offsets && !elem.visited){
                    //     elem.mist_offsets.forEach(mist => {
                    //         this.ctx.drawImage(this.img_data.getImage('mist'),elem.mist_frame * 100, mist ,100,100,elem.pretti_x * this.cell_size,elem.pretti_y * this.cell_size - (mist == 0 && elem.mist_draw_offset ? elem.mist_draw_offset : 0), this.cell_size, this.cell_size)
                    //     })
                    //     elem.mist_timer ++
                    //     if(elem.mist_timer >= 4){
                    //         elem.mist_timer = 0
                    //         elem.mist_frame ++
                    //         if(elem.mist_frame >= elem.mist_max_frame){
                    //             elem.mist_frame = 0
                    //         }
                    //     }
                    // }
                    sprite.act()
                }
            })
        })

        if(char.fliped){
            this.ctx.save()
            Functions.flipHorizontally(this.ctx, char.pretti_x * this.cell_size)
        }
        this.ctx.drawImage(this.img_data.getImage('chel'),96 * char.sprite.frame,char.sprite.y_frame_offset,96,96,char.pretti_x * this.cell_size + (!char.fliped ? 20 : -80),char.pretti_y * this.cell_size -20, 72, 72)
        if(char.fliped){
            this.ctx.restore()
        }
        char.sprite.frame_timer ++
        if(char.sprite.frame_timer >= char.sprite.frame_timer_max){
            char.sprite.frame_timer = 0
            char.sprite.frame ++
            if(char.sprite.frame >= char.sprite.max_frame){
                char.sprite.frame = 0
            }
        }
    }
}