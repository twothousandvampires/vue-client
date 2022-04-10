import Functions from "../GameFunctions";
export default class ChainLight{

    constructor(img_src , x, y, distance, angle) {
        this.cord_x = x
        this.cord_y = y - 40
        this.image = img_src
        this.box_size_x =  (40 * distance)/240
        this.box_size_y = distance
        this.angle = angle
        this.frame = 0
        this.frame_timer = 0
    }q

    act(effect ,ctx){
        this.frame_timer ++
        if(this.frame_timer === 1){
            this.frame_timer = 0
            this.frame ++
            if(this.frame === 16){
                effect.splice(effects.indexOf(this),1)
            }
        }
        this.draw(ctx)
    }

    draw(ctx){
        if(this.angle){
            ctx.translate(this.cord_x, this.cord_y);
            ctx.rotate(-this.angle);
            ctx.drawImage(this.image, 30 * this.frame, 0 ,30,120, -this.box_size_x/2 , - this.box_size_y, this.box_size_x , this.box_size_y);
            ctx.rotate(this.angle);
            ctx.translate(-this.cord_x, -this.cord_y);
        }
    }
}