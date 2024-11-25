import Render from "./Render";
import Functions from "../../GameFunctions";
import Input from "@/views/game/components/game_canvas/src/Singltons/Input";

export default class UndergroundRender extends Render{
    updateCellInfo(item){
        let info = item.name
        let div = document.getElementById('cell_info')
        div.style.visibility = 'visible'
        div.innerText = info
    }
    closeCellInfo(){
        let div = document.getElementById('cell_info')
        div.style.visibility = 'hidden'
    }
    draw(map, char){
        this.ctx.fillStyle = 'black'
        this.ctx.clearRect(0,0,1300,1300)
        this.ctx.fillRect(0,0,1300,1300)

        let input = Input.getInput()
        let cursor = undefined
        map.forEach(row => {
            row.forEach(elem => {

                if(elem.light){
                    if(input?.canvas_x > elem.pretti_x * this.cell_size && input?.canvas_x < elem.pretti_x * this.cell_size + this.cell_size && input?.canvas_y > elem.pretti_y * this.cell_size  && input?.canvas_y < elem.pretti_y * this.cell_size + this.cell_size){
                        if(elem && !cursor){
                            cursor = elem
                        }
                    }

                    let sprite = elem.sprite
                    this.ctx.drawImage(this.img_data.getImage(sprite.img_name), sprite.frame * sprite.width, sprite.y_frame_offset, sprite.width, sprite.height, elem.pretti_x * sprite.width, elem.pretti_y * sprite.height, sprite.width, sprite.height)
                    if(elem.content_sprite){
                        let content_sprite = elem.content_sprite
                        this.ctx.drawImage(this.img_data.getImage(content_sprite.img_name),
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
                    if(elem.effect){
                        let effect = elem.effect
                        this.ctx.drawImage(this.img_data.getImage(effect.img_name),
                            effect.frame * effect.width,
                            0,
                            effect.width,
                            effect.height,
                            elem.pretti_x * this.cell_size +  effect.content_img_offset_x,
                            elem.pretti_y * this.cell_size + effect.content_img_offset_y,
                            effect.size_w,
                            effect.size_h)
                        effect.act()
                    }
                    if(elem.mist_offsets.length){
                        elem.mist_offsets.forEach(mist => {
                            this.ctx.drawImage(this.img_data.getImage('black_mist'),elem.mist_frame * 100, mist ,100,100,elem.pretti_x * this.cell_size,elem.pretti_y * this.cell_size , this.cell_size, this.cell_size)
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
                    sprite.act()
                }
            })
        })
        if(cursor){
            if(cursor.content_sprite){
                this.updateCellInfo(cursor.content_sprite)
            }
            char.map_cursored_elem = cursor
        }
        else {
            char.map_cursored_elem = undefined
            this.closeCellInfo()
        }
        if(char.fliped){
            this.ctx.save()
            Functions.flipHorizontally(this.ctx, char.pretti_x * this.cell_size)
        }
        this.ctx.drawImage(this.img_data.getImage('grim2'),96 * char.sprite.frame,char.sprite.y_frame_offset, 95, 95 ,char.pretti_x * this.cell_size + (!char.fliped ? 0 : -90),char.pretti_y * this.cell_size - 40 , 96, 96)
        if(char.fliped){
            this.ctx.restore()
        }
        char.sprite.act()
    }
}