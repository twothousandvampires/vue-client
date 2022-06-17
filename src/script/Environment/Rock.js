import GameObject from "../scr/GameObject";

export default class Rock extends GameObject{

    constructor(x, y, w, h) {
        console.log(x)
        super(x, y)
        this.size_x = w
        this.size_y = h
        this.sprite_w = 100
        this.sprite_h = 50
        this.box_size_x = w
        this.box_size_y = h/2
        this.img_name = 'rock'
    }

}