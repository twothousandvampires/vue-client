import Rock from "../Rock";
import SmallStalagmiteSprite from "./sprite/SmallStalagmiteSprite";

export default class SmallStalagmite extends Rock{
    constructor(context,x, y) {
        super(context,x ,y);
        this.sprite = new SmallStalagmiteSprite(this)
        this.size_x = 40
        this.size_y = 80
        this.box_size_x = 38
        this.box_size_y = 20
    }
}