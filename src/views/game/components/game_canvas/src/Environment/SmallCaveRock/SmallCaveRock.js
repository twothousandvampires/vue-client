import Rock from "../Rock";
import SmallCaveRockSprite from "./sprite/SmallCaveRock";

export default class SmallCaveRock extends Rock {
    constructor(context, x, y) {
        super(context, x, y);
        this.sprite = new SmallCaveRockSprite(this)
        this.size_x = 40
        this.size_y = 27
        this.box_size_x = 38
        this.box_size_y = 16
    }
}