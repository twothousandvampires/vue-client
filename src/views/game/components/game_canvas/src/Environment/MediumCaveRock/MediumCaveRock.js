import Rock from "../Rock";
import MediumCaveRockSprite from "./sprite/MediumCaveRock";

export default class MediumCaveRock extends Rock {
    constructor(context, x, y) {
        super(context, x, y);
        this.sprite = new MediumCaveRockSprite(this)
        this.size_x = 90
        this.size_y = 62
        this.box_size_x = 85
        this.box_size_y = 22
    }
}
