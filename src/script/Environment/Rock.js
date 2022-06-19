import GameObject from "../scr/GameObject";

export default class Rock extends GameObject{

    constructor(x, y, w, h) {
        super(x, y)
        this.size_x = w
        this.size_y = h
        this.sprite_w = 120
        this.sprite_h = 80
        this.box_size_x = w
        this.box_size_y = h/2
        this.img_name = 'rock'
        if(this.size_x < 90){
            this.frame = 2
            this.box_size_x -=20
            this.box_size_y -=15
        }
        else {
            if(Math.random() > 0.5){
                this.frame = 1
            }
        }
    }

}