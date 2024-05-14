import Rock from "../Rock";
import BigStalagmiteSprite from "./sprite/BigStalagmiteSprite";

export default class BigStalagmite extends Rock{
    constructor(context,x, y) {
        super(context,x ,y);
        this.sprite = new BigStalagmiteSprite(this)
        this.size_x = 90
        this.size_y = 160
        this.box_size_x = 84
        this.box_size_y = 30
    }
}