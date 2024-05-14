import Effect from "../Effect";
import FireExplosionBigSprite from "./sprite/FireExplosionBigSprite";


export default class FireExplosionBig extends Effect{

    constructor(context, x, y, w, h) {
        super(context, x, y, w, h)
        this.sprite = new FireExplosionBigSprite(this)
        this.size_x = w
        this.size_y = h
        this.box_size_x = w
        this.box_size_y = h
    }
}