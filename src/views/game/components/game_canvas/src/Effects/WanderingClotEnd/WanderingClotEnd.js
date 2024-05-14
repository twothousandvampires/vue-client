import Effect from "../Effect";
import WanderingClotEndSprite from "./sprite/WanderingClotEndSprite";

export default class WanderingClotEnd extends Effect{

    constructor(context, x, y, w, h)  {
        super(context, x, y, w, h)
        this.size_x = w
        this.size_y = h
        this.box_size_x = w
        this.box_size_y = h

        this.sprite = new WanderingClotEndSprite(this)
    }

    act(){
        this.size_x += 2
        this.size_y += 2
        this.sprite.act()
        if(this.sprite.isSpriteLoopEnd()){
            this.remove()
        }
    }
}