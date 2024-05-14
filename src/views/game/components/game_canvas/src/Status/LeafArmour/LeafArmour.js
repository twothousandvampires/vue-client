import Status from "../Status";
import Functions from "../../GameFunctions";
import LeafArmourSprite from "./sprite/LeafArmourSprite";

export default class LeafArmour extends Status{
    constructor() {
        super()
        this.name = 'leaf armour'
        this.img_path = 'src/assets/img/icons/status/leaf_armour.png'
        this.sprite = new LeafArmourSprite(this)
        this.size_x = 40
        this.size_y = 40
        this.duration = Functions.msToTick(10000)
    }

    act(){
        let tick = this.target.figth_context.tick
        if(tick % 25 === 0){
            this.target.addLife(1)
        }
        this.setMiddlePoint()
        if(tick >= (this.duration) + this.affect_time){
            this.expire()
        }

        this.sprite.act()
    }

    expire(){
        this.target.status.delete(this.name)
    }

    affect(target, source){
        this.target = target
        this.affect_time = target.figth_context.tick
        this.source = source
    }

    update(status){
        this.affect_time = this.target.figth_context.tick
        this.duration = status.duration
    }

    targetDead() {
        this.expire()
    }
}