import Sprite from "../../../Scr/sprite/UnitSprite";

export default class SmallStalagmiteSprite extends Sprite{
    constructor(context, x, y) {
        super(context, x, y);
        this.width = 28
        this.height = 44
        this.img = new Image()
        this.img.src = 'src/assets/img/rocks/stalagmite_3.png'
    }
}