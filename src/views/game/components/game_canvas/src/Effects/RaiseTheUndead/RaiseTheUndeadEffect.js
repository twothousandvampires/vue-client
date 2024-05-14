import Effect from "../Effect";
import RaiseTheUndeadSprite from "./sprite/RaiseTheUndeadSprite";

export default class RaiseTheUndeadEffect extends Effect{

    constructor(context, x, y, w, h) {
        super(context, x, y, w, h)
        this.sprite = new RaiseTheUndeadSprite(this)
        this.name = 'raise the undead'
        this.size_x = w
        this.size_y = h
        this.box_size_x = w
        this.box_size_y = h
    }
}