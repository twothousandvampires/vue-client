import Sprite from "../../../Scr/sprite/UnitSprite";

export default class BigStalagmiteSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 67
        this.height = 87
        this.img = new Image()
        this.img.src = 'src/assets/img/rocks/stalagmite_1.png'
    }
}