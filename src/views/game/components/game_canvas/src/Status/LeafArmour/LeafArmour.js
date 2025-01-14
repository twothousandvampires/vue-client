import Status from "../Status";
import LeafArmourSprite from "./sprite/LeafArmourSprite";

export default class LeafArmour extends Status{
    constructor() {
        super()
        this.name = 'leaf armour'
        this.status_bar_img_name = 'leaf_fall.gif'
        this.sprite = new LeafArmourSprite(this)
        this.duration = 3
    }

    expire(){
        this.target.status.delete(this.name)
    }

    newTurn(){
        this.target.addLife(1)
    }

    affect(target, source){
        this.target = target
        this.affect_time = target.fight_context.tick
        this.source = source
    }

    update(status){
        this.duration = status.duration
    }

    targetDead() {
        this.expire()
    }

    getDescription(){
        return `Your restore life`
    }
}