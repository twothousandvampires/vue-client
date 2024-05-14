import Rock from "../Rock";
import MediumStalagmiteSprite from "./sprite/MediumStalagmiteSprite";

export default class MediumStalagmite extends Rock{
    constructor(context,x, y) {
        super(context,x ,y);
        this.sprite = new MediumStalagmiteSprite(this)
        this.size_x = 70
        this.size_y = 120
        this.box_size_x = 74
        this.box_size_y = 25
    }
}