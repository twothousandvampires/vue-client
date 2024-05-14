import Effect from "../Effect";
import RocksJumpSprite from "./sprite/RocksJumpSprite";

export default class RocksJump extends Effect{
    constructor(context, x, y, w, h) {
        super(context, x, y, w, h);
        this.sprite = new RocksJumpSprite(this)
        this.size_x = w
        this.size_y = h
        this.box_size_x = w
        this.box_size_y = h
    }
}