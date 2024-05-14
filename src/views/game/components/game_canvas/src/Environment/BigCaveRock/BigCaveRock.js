import Rock from "../Rock";
import BigCaveRickSprite from "./sprite/BigCaveRickSprite";

export default class BigCaveRock extends Rock{
    constructor(context,x, y) {
        super(context,x ,y);
        this.sprite = new BigCaveRickSprite(this)
        this.size_x = 140
        this.size_y = 94
        this.box_size_x = 130
        this.box_size_y = 35
    }
}