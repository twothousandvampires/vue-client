import Sprite from "../../../Scr/sprite/UnitSprite";

export default class MediumCaveRockSprite extends Sprite{
    constructor(owner) {
        super(owner);
        this.width = 45
        this.height = 31
        this.img = new Image()
        this.img.src = 'src/assets/img/rocks/cave_rock_2.png'
    }

}