import Sprite from "../../../Scr/sprite/UnitSprite";

export default class SmallCaveRockSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 40
        this.height = 27
        this.img = new Image()
        this.img.src = 'src/assets/img/rocks/cave_rock_3.png'
    }

}