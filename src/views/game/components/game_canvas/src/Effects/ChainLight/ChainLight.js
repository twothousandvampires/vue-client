import Effect from "../Effect";
import ChainLightSprite from "./sprite/ChainLightSprite";
export default class LuminousArcEffect extends Effect{

    constructor(context, x, y, w, h = 0, angle)  {
        super(context, x, y, w, h , angle)
        this.size_x =  (40 * w)/240
        this.size_y = w
        this.box_size_x =  (40 * w)/240
        this.box_size_y = w

        this.angle = angle
        this.sprite = new ChainLightSprite(this)
    }

}