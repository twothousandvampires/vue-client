import Sprite from "../../../Scr/sprite/UnitSprite";

export default class BigCaveRickSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 70
        this.height = 47
        this.img = new Image()
        this.img.src = 'src/assets/img/rocks/cave_rock_1.png'
    }

}