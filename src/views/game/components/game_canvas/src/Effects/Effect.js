import GameObject from "../Scr/GameObject";

export default class Effect extends GameObject{

    constructor(context) {
        super(context)
    }

    act(){
        this.sprite.frame_timer ++
        if(this.sprite.frame_timer === this.sprite.frame_timer_max){
            this.sprite.frame_timer = 0
            this.sprite.frame ++
            if(this.sprite.frame === this.sprite.max_frame){
                this.fight_context.removeEffect(this)
            }
        }
    }
    
    remove(){
        this.fight_context.effects = this.fight_context.effects.filter(elem => elem != this)
    }
}