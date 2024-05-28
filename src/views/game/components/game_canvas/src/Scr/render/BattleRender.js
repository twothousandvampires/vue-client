import Render from "./Render";
import Functions from "../../GameFunctions";
import Input from "@/views/game/components/game_canvas/src/Singltons/Input";

export default class BattleRender extends Render{
    constructor() {
        super();
        this.show_box = false
        this.show_state = false
        this.show_attack_range = false

        this.can_w = 900
        this.can_h = 900

    }

    drawBg(context){
        this.ctx.drawImage(this.img_data.getImage('background'),0,0,900,900,context.map.start_x - 25,context.map.start_y - 25,context.map.width + 50,context.map.height +50)
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
        let all = fight_context.effects_before.concat(fight_context.areas_before)

        let to_sort = [fight_context.player].concat(fight_context.enemy).concat(fight_context.effects).concat(fight_context.projectiles).concat(fight_context.areas)

        to_sort.sort(function(a,b){
            return a.point.y - b.point.y
        })

        all = all.concat(to_sort).concat(fight_context.effects_after).concat(fight_context.areas_after)

        if(cell){
            this.ctx.strokeStyle = "green";
            this.ctx.lineWidth = 15;
            this.ctx.strokeRect(cell.x, cell.y, cell.width, cell.height);
        }

        all.forEach(elem =>{
            if(elem.opacity != 1){
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
                    elem.sprite.width,
                    elem.sprite.height,
                    elem.point.x - elem.size_x/2,
                    elem.point.y - elem.size_y + elem.box_size_y/2,
                    elem.size_x,
                    elem.size_y)
            }

            if(elem.fliped){
                this.ctx.restore()
            }
            // this.ctx.font = "48px serif";
            // this.ctx.fillText(elem.stacked ? '1' : '0', elem.point.x, elem.point.y - 100)
            if(this.show_box){
                this.ctx.fillStyle = 'black'
                this.ctx.fillRect(elem.point.x - elem.box_size_x/2,elem.point.y - elem.box_size_y/2, elem.box_size_x, elem.box_size_y)
            }
            // if(elem.radius){
            //     this.ctx.beginPath();
            //     this.ctx.arc(elem.point.x, elem.point.y, elem.radius, 0, 2*Math.PI, false);
            //     this.ctx.fillStyle = 'yellow';
            //     this.ctx.fill();
            //     this.ctx.lineWidth = 1;
            //     this.ctx.strokeStyle = 'yellow';
            //     this.ctx.stroke();
            // }
            if(this.show_attack_range && elem.state === 'attack'){
                this.ctx.beginPath();
                this.ctx.arc(elem.point.x, elem.point.y, elem.getAttackRange(), 0, 2*Math.PI, false);
                this.ctx.fillStyle = 'red';
                this.ctx.fill();
                this.ctx.lineWidth = 1;
                this.ctx.strokeStyle = 'red';
                this.ctx.stroke();

                // if(elem.radius){
                //     this.ctx.beginPath();
                //     this.ctx.arc(elem.point.x, elem.point.y, elem.getAttackRange(), 0, 2*Math.PI, false);
                //     this.ctx.fillStyle = 'yellow';
                //     this.ctx.fill();
                //     this.ctx.lineWidth = 1;
                //     this.ctx.strokeStyle = 'yellow';
                //     this.ctx.stroke();
                // }

            }
            if(this.show_state){
                this.ctx.fillStyle = 'yellow'
                this.ctx.fillText(elem.state,elem.point.x,elem.point.y - elem.box_size_y/2 -100,)
            }

            if(elem.opacity !== 1){
                this.ctx.globalAlpha = 1
            }
            if(elem.status){
                elem.status.forEach(status => {
                    if(status.sprite){
                        this.ctx.drawImage(status.sprite.img,
                            status.sprite.width * status.sprite.frame,
                            status.sprite.y_frame_offset,
                            status.sprite.width,
                            status.sprite.height,
                            status.sprite.point.x  - status.sprite.size_x/2,
                            status.sprite.point.y - status.sprite.size_y/2,
                            status.sprite.size_x,
                            status.sprite.size_y )
                        }
                })
            }
        })

    }
}