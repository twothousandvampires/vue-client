import GameObject from "../Scr/GameObject";

export default class Effect extends GameObject{

    constructor(context, x, y, w, h , angle = false) {
        super(context, x, y)
        this.size_x = w
        this.size_y = h
        this.angle = angle

        this.box_size_x = w
        this.box_size_y = h
    }

    act(){
        this.sprite.frame_timer ++
        if(this.sprite.frame_timer === this.sprite.frame_timer_max){
            this.sprite.frame_timer = 0
            this.sprite.frame ++
            if(this.sprite.frame === this.sprite.max_frame){
                this.figth_context.removeEffect(this)
            }
        }
    }
    
    remove(){
        this.figth_context.effects = this.figth_context.effects.filter(elem => elem != this)
    }
}