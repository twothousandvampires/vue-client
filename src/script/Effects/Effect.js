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
    }

    act(game){
        this.frame_timer ++
        if(this.frame_timer === 2){
            this.frame_timer = 0
            this.frame ++
            if(this.frame === 5){
                game.effects.splice(game.effects.indexOf(this),1)
            }
        }
        this.draw(game)
    }

    draw(game){
        let ctx = game.ctx
        if(this.angle){
            ctx.translate(this.cord_x, this.cord_y);
            ctx.rotate(-this.angle);
            ctx.drawImage(this.image, 100 * this.frame, 0 ,100,100, -this.box_size_x / 2 , - this.box_size_y/2, this.box_size_x , this.box_size_y);
            ctx.rotate(this.angle);
            ctx.translate(-this.cord_x, -this.cord_y);

        }
    }
}