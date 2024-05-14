import Sprite from "../../../Scr/sprite/UnitSprite";

export default class MediumStalagmiteSprite extends Sprite{
    constructor(context, x, y) {
        super(context, x, y);
        this.width = 52
        this.height = 78
        this.img = new Image()
        this.img.src = 'src/assets/img/rocks/stalagmite_2.png'
    }
}