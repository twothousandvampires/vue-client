import Status from "../Status";
import FreezeEffect from "@/views/game/components/game_canvas/src/Effects/FreezeEffect";
export default class Freeze extends Status{
    constructor(duration = 1) {
        super()
        this.name = 'freeze'
        this.duration = duration + 1
        this.description = 'you will skip your turns while you are frozen'
        this.status_bar_img_name = 'frozen.png'
        this.sprite = undefined
    }

    newTurn(){
        this.duration --
        if(!this.duration){
            this.expire()
        }
    }
    affect(target){
        this.target = target
        this.target.frozen = true
        this.sprite = new FreezeEffect(this.target.fight_context)
        this.target.fight_context.addEffect(this.sprite, target.num)
    }

    expire(){
        this.target.removeFreeze()
        this.target.fight_context.removeEffect(this.sprite)
        this.target.status.delete(this.name)
    }

    update(status){
        this.duration = status.duration
    }
    targetDead(){
        this.expire()
    }
}