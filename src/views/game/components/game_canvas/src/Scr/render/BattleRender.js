import Render from "./Render";
import Functions from "../../GameFunctions";
import Input from "@/views/game/components/game_canvas/src/Singltons/Input";

export default class BattleRender extends Render{
    constructor(fight_context) {
        super();
        this.fight_context = fight_context
        this.show_box = false
        this.show_state = false
        this.show_attack_range = false
        this.can_w = 900
        this.can_h = 900

        this.showItemsAndSpells()
    }
    showItemsAndSpells(){

    }
    drawBg(context){
        this.ctx.drawImage(this.img_data.getImage('background'),
            0,
            0,
            450,
            450,
            1300/2 - 450/2,
            1300/2 - 450/2,
            450,
            450,
        )
    }
    updateCellInfo(content, player){
        let info = content.getInfo()
        let div = document.getElementById('cell_info')
        player.cursored_target = content
        div.style.visibility = 'visible'
        div.innerText = info
    }
    closeCellInfo(player){
        let div = document.getElementById('cell_info')
        player.cursored_target = undefined
        div.style.visibility = 'hidden'
    }
    draw(fight_context){
        let input = Input.getInput()
        let cells = fight_context.cells
        let cell = undefined


        cells.forEach(elem => {
            if(input?.canvas_x> elem.x && input?.canvas_x< elem.x + elem.width && input?.canvas_y > elem.y  && input?.canvas_y < elem.y + elem.height){
                cell = elem
            }
        })

        this.ctx.clearRect(0,0,1300,1300)
        this.drawBg(fight_context)

        let all = fight_context.ground_effects

        let to_sort = [fight_context.player].concat(fight_context.enemy_pull).concat(fight_context.summons).concat(fight_context.effects)

        to_sort.sort(function(a,b){
            return a.point.y - b.point.y
        })

        all = all.concat(to_sort)

        if(!cell || !cell.content){
            this.closeCellInfo(fight_context.player)
        }
        else if(cell){
            this.ctx.strokeStyle = "green";
            this.ctx.lineWidth = 15;
            this.ctx.strokeRect(cell.x, cell.y, cell.width, cell.height);
            this.updateCellInfo(cell.content, fight_context.player)
        }

        all.forEach(elem =>{
            if(elem.opacity !== 1){
                this.ctx.globalAlpha = elem.opacity
            }
            if(elem.fliped){
                this.ctx.save()
                Functions.flipHorizontally(this.ctx, elem.point.x)
            }
            if(elem.angle){
                this.ctx.translate(elem.point.x, elem.point.y);
                this.ctx.rotate(-elem.angle);
                this.ctx.drawImage(this.img_data.getImage(elem.sprite.img_name), elem.sprite.width * elem.sprite.frame, 0 ,elem.sprite.width ,elem.sprite.height,- elem.size_x/2 , - elem.size_y/2 , elem.size_x  , elem.size_y );
                this.ctx.rotate(elem.angle);
                this.ctx.translate(-elem.point.x, -elem.point.y);
            }
            else {
                this.ctx.drawImage(this.img_data.getImage(elem.sprite.img_name),
                    elem.sprite.width * elem.sprite.frame,
                    elem.sprite.y_frame_offset,
                    elem.sprite.width - 1,
                    elem.sprite.height - 1,
                    elem.point.x - elem.size_x/2,
                    elem.point.y - elem.size_y/2 + elem.sprite.draw_y_offset,
                    elem.size_x,
                    elem.size_y)
            }

            if(elem.fliped){
                this.ctx.restore()
            }
            if(elem.opacity !== 1){
                this.ctx.globalAlpha = 1
            }
        })

    }
}