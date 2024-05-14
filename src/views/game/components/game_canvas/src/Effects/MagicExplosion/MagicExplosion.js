import Effect from "../Effect";
import MagicExplosionSprite from "./sprite/MagicExplosionSprite";

export default class MagicExplosion extends Effect{

    constructor(context, x, y, w, h) {
        super(context, x, y, w, h)
        this.sprite = new MagicExplosionSprite(this)
        this.size_x = w
        this.size_y = h
        this.box_size_x = w
        this.box_size_y = h
    }
}
