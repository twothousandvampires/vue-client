import Functions from "../GameFunctions";
export default class Effect{

    constructor(img_src , size , angle) {
        this.cord_x = size.cord_x
        this.cord_y = size.cord_y
        this.image = img_src
        this.box_size_x = size.box_size_x
        this.box_size_y = size.box_size_y
        this.angle = angle
        this.frame = 0
        this.frame_timer = 0
        this.y_offset = 0
        this.deal_hit = false
    }

    act(effect,ctx,enemy){
        if(this.frame < 2 && !this.deal_hit){
            enemy.forEach(enemy =>{
                if(Functions.rectCollision(this,enemy) && !this.deal_hit){
                    this.deal_hit = true
                    enemy.splice(enemy.indexOf(enemy),1)
                }
            })
        }
        this.frame_timer ++
        if(this.frame_timer === 2){
            this.frame_timer = 0
            this.frame ++
            if(this.frame === 5){
                effect.splice(effect.indexOf(this),1)
            }
        }
        this.draw(ctx)
    }

    draw(ctx){
        if(this.angle){
            ctx.translate(this.cord_x, this.cord_y);
            ctx.rotate(-this.angle);
            ctx.drawImage(this.image, 100 * this.frame, this.y_offset ,100,100, -this.box_size_x / 2 , - this.box_size_y/2, this.box_size_x , this.box_size_y);
            ctx.rotate(this.angle);
            ctx.translate(-this.cord_x, -this.cord_y);
        }
    }
}