import Effect from "../Effect";
import FreezeDeadSprite from "./sprite/ShatterSprite";

export default class Shatter extends Effect{

    constructor(context, x, y, w, h)  {
        super(context, x, y, w, h)
        this.size_x = w
        this.size_y = h
        this.box_size_x = w
        this.box_size_y = h

        this.sprite = new FreezeDeadSprite(this)
    }

    act(){
        this.sprite.act()
        if(this.sprite.sprite_end){
            this.remove()
        }
    }
}